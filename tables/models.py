from django.core.exceptions import ValidationError
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.mail import EmailMultiAlternatives


class Table(models.Model):
    RECTANGLE = 'rectangle'
    OVAL = 'oval'
    TABLE_SHAPE_CHOICES = (
        (RECTANGLE, 'Rectangle'),
        (OVAL, 'Oval')
    )

    number = models.IntegerField(verbose_name=u'Number', unique=True)
    places_number = models.IntegerField(verbose_name=u'Number of places', default=4)
    shape = models.CharField(
        verbose_name=u'Table shape', choices=TABLE_SHAPE_CHOICES, default=RECTANGLE, max_length=50
    )
    left = models.IntegerField(
        verbose_name=u'Position X (%)', validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    top = models.IntegerField(
        verbose_name=u'Position Y (%)', validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    width = models.IntegerField(
        verbose_name=u'Width (%)', validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    height = models.IntegerField(
        verbose_name=u'Height (%)', validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    def __str__(self):
        return str(self.number)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.intersect():
            raise ValueError("The object can not be located.\n"
                             "Reason: this object intersects with another object")

        if self.overflow():
            raise ValueError("The object can not be located.\n"
                             "Reason: given object outside the room boundary")

        return super(Table, self).save(force_insert=False, force_update=False,
                                       using=None, update_fields=None)

    def clean(self):
        if self.intersect():
            raise ValidationError("The object can not be located.\n"
                                  "Reason: this object intersects with another object")

        if self.overflow():
            raise ValidationError("The object can not be located.\n"
                                  "Reason: given object outside the room boundary")

    def intersect(self):
        """
        Check for intersection of the current object with other objects
        """
        ax1 = self.left
        ax2 = self.left + self.width
        ay1 = 100 - self.top
        ay2 = 100 - self.top - self.height
        tables = Table.objects.all().exclude(pk=self.pk)

        for table in tables:
            bx1 = table.left
            bx2 = table.left + table.width
            by1 = 100 - table.top
            by2 = 100 - table.top - table.height

            if not (((ay1 < by2) or (ay2 > by1)) or ((ax2 < bx1) or (ax1 > bx2))):
                return True

        return False

    def overflow(self):
        """
        Check the intersection of an object with a room boundary
        """
        ax2 = self.left + self.width
        ay2 = self.top + self.height

        return (ax2 > 100) or (ay2 > 100)


class Order(models.Model):
    table = models.ForeignKey(Table, to_field='number', on_delete=models.CASCADE)
    date = models.DateField()

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        orders = Order.objects.all().exclude(pk=self.pk)
        for order in orders:
            if (order.date == self.date) and (order.table == self.table):
                raise ValueError("This table has already been reserved by someone")

        return super(Order, self).save(force_insert=False, force_update=False,
                                       using=None, update_fields=None)
