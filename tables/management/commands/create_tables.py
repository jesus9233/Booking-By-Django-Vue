from django.core.management.base import BaseCommand, CommandError
from tables.models import Table


class Command(BaseCommand):
    help = 'Creates 3 columns of tables'

    def handle(self, *args, **options):
        Table.objects.all().delete()
        n = 1
        for i in range(0, 3):
            # First column of rectangle tables
            Table.objects.create(
                number=i+1,
                places_number=4,
                shape=Table.RECTANGLE,
                left=10,
                top=10+i*20,
                width=20,
                height=10
            )
            # Second column of rectangle tables
            Table.objects.create(
                number=i+5,
                places_number=4,
                shape=Table.RECTANGLE,
                left=40,
                top=10+i*20,
                width=20,
                height=10
            )
            # Third column of rectangle tables
            Table.objects.create(
                number=i+9,
                places_number=4,
                shape=Table.RECTANGLE,
                left=70,
                top=10+i*20,
                width=20,
                height=10
            )

        for i in range(0, 3):
            # Last row of oval tables
            Table.objects.create(
                number=(i+1)*4,
                places_number=4,
                shape=Table.OVAL,
                left=10 + i * 30,
                top=80,
                width=20,
                height=10
            )
