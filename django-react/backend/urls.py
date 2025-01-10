from django.urls import path
from django import views  # Import your registration view

urlpatterns = [
    path('register/', views.registration_view, name='register'),
]
