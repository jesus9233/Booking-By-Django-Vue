from django.urls import include, path
from rest_framework.routers import DefaultRouter
from tables import views

router = DefaultRouter()
router.register(r'tables', views.TableViewSet)
router.register(r'orders', views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('tables/reserved_numbers', views.ReservedNumbersAPIView.as_view()),
]


