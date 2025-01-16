from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from mall import views
from django.views.generic import RedirectView

router = routers.DefaultRouter()
router.register('Product', views.ProductView, 'Product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/v1/mall/', include('mall.urls')),
    path('', RedirectView.as_view(url='/api/', permanent=False)),
]