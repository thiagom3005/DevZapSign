from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Company, Doc, User
from .serializers import CompanySerializer, DocSerializer, UserSerializer
from django.utils import timezone


class CompanyModelTestCase(TestCase):
    def test_create_company(self):
        company = Company.objects.create(
            name='Test Company',
            locale='-03:00',
            lang='pt',
            created_at=timezone.now(),
            last_update_at=timezone.now(),
        )
        self.assertEqual(company.name, 'Test Company')
        self.assertEqual(company.locale, '-03:00')
        self.assertEqual(company.lang, 'pt')
        self.assertIsNotNone(company.created_at)
        self.assertIsNotNone(company.last_update_at)


class DocModelTestCase(TestCase):
    def test_create_document(self):
        company = Company.objects.create(name='Test Company ')
        user = User.objects.create(email='test1@example.com', password='test123')
        document = Doc.objects.create(
            name='Test Document',
            deleted=False,
            date_limit_to_sign=timezone.now(),
            signed=False,
            company=company,
            created_by=user,
        )
        self.assertEqual(document.name, 'Test Document')
        self.assertFalse(document.deleted)
        self.assertIsNotNone(document.date_limit_to_sign)
        self.assertFalse(document.signed)
        self.assertEqual(document.company, company)
        self.assertEqual(document.created_by, user)


class UserAPITest(APITestCase):
    def setUp(self):
        self.user_data = {
            'email': 'test@example.com',
            'password': 'test123',
            'last_password_definition_at': timezone.now(),
            'email_verified': True
        }
        self.user = User.objects.create(**self.user_data)

    def test_create_user(self):
        self.user_data = {
            'email': 'test2@example.com',
            'password': 'test123',
            'last_password_definition_at': timezone.now(),
            'email_verified': True
        }
        response = self.client.post('/api/users/', self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)  # Verifica se o usuário foi criado com sucesso

    def test_get_user(self):
        response = self.client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.user.email)

    def test_update_user(self):
        updated_email = 'new_email@example.com'
        response = self.client.put(f'/api/users/{self.user.id}/', {'email': updated_email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.get(id=self.user.id).email, updated_email)

    def test_delete_user(self):
        response = self.client.delete(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(id=self.user.id).exists())


# Testes de Serialização
class SerializerTestCase(TestCase):
    def test_company_serializer(self):
        company_data = {
            'name': 'Test Company',
            'locale': '-03:00',
            'lang': 'pt',
            'created_at': timezone.now(),
            'last_update_at': timezone.now(),
        }
        serializer = CompanySerializer(data=company_data)
        self.assertTrue(serializer.is_valid())
        company_instance = serializer.save()
        self.assertIsInstance(company_instance, Company)

    def test_doc_serializer(self):
        doc_data = {
            'name': 'Test Document',
            'deleted': False,
            'date_limit_to_sign': timezone.now(),
            'signed': False,
            'company': Company.objects.create(name='Test Company').id,
            'created_by': User.objects.create(email='test3@example.com', password='test123').id,
        }
        serializer = DocSerializer(data=doc_data)
        self.assertTrue(serializer.is_valid())
        doc_instance = serializer.save()
        self.assertIsInstance(doc_instance, Doc)

    def test_user_serializer(self):
        user_data = {
            'email': 'test4@example.com',
            'last_password_definition_at': timezone.now(),
            'email_verified': True,
            'password': 'test123',
        }
        serializer = UserSerializer(data=user_data)
        self.assertTrue(serializer.is_valid())
        user_instance = serializer.save()
        self.assertIsInstance(user_instance, User)
