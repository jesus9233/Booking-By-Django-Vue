from django.contrib import admin
from tables.models import Table, Order


class TableAdmin(admin.ModelAdmin):
    pass


class OrderAdmin(admin.ModelAdmin):
    pass


admin.site.register(Table, TableAdmin)
admin.site.register(Order, OrderAdmin)
