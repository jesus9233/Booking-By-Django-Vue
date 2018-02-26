from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, GenericViewSet
from rest_framework import mixins

from tables.serializers import *


@api_view(['GET'])
def api_root(request):
    return Response({
        'tables': reverse('table-list', request=request),
        'orders': reverse('order-list', request=request)
    })


class TableViewSet(ReadOnlyModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer


class ReservedNumbersAPIView(APIView):
    """
    Reserved table numbers for a certain date
    """
    def post(self, request):
        if 'date' in request.data:
            date = request.data.get('date')
            reserved_numbers = []

            for order in Order.objects.filter(date=date):
                reserved_numbers.append(order.table.number)

            return Response({
                'reserved_numbers': reserved_numbers
            })


class OrderViewSet(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

