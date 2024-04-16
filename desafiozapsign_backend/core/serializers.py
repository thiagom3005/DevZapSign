from rest_framework import serializers
from .models import Company, Doc, User

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'locale', 'lang', 'created_at', 'last_update_at', 'created_by', 'users', 'docs']
        read_only_fields = ['created_at', 'last_update_at']


class DocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doc
        fields = ['id', 'name', 'deleted', 'date_limit_to_sign', 'signed', 'company', 'created_by']
        read_only_fields = ['created_at', 'last_update_at', 'signed']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'last_password_definition_at', 'email_verified', 'password', 'created_at', 'last_update_at', 'companies', 'documents', 'primary_company']
        read_only_fields = ['created_at', 'last_update_at', 'password']
