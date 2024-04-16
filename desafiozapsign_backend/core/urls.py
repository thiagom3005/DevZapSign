"""
URL configuration for desafiozapsign_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('companies/', views.CompanyListCreateAPIView.as_view(), name='company-list-create'),
    path('companies/<int:pk>/', views.CompanyDetailAPIView.as_view(), name='company-detail'),
    path('docs/', views.DocListCreateAPIView.as_view(), name='doc-list-create'),
    path('docs/<int:pk>/', views.DocDetailAPIView.as_view(), name='doc-detail'),
    path('users/', views.UserListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', views.UserDetailAPIView.as_view(), name='user-detail'),
]