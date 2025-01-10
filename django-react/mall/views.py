from django.views import generic
from .models import Product

class ProductView(generic.ListView):
    model = Product
    template_name = 'mall/product_list.html'
