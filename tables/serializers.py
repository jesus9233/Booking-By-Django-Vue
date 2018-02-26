from rest_framework.serializers import ModelSerializer
from tables.models import Table, Order


class TableSerializer(ModelSerializer):
    class Meta:
        model = Table
        fields = ('number', 'places_number', 'shape', 'left',
                  'top', 'width', 'height')


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = ('pk', 'table', 'date')
