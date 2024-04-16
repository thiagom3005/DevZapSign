from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Company, Doc, User
from .serializers import CompanySerializer, DocSerializer, UserSerializer
from django.http import Http404

class CompanyListCreateAPIView(APIView):
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompanyRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        company = self.get_object(pk)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    def put(self, request, pk):
        company = self.get_object(pk)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        company = self.get_object(pk)
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DocListCreateAPIView(APIView):
    def get(self, request):
        docs = Doc.objects.all()
        serializer = DocSerializer(docs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DocSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DocDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Doc.objects.get(pk=pk)
        except Doc.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        doc = self.get_object(pk)
        serializer = DocSerializer(doc)
        return Response(serializer.data)

    def put(self, request, pk):
        doc = self.get_object(pk)
        serializer = DocSerializer(doc, data=request.data)
        if serializer.is_valid():
            # Verificar se a ação de assinar foi solicitada
            if 'sign' in request.data and request.data['sign']:
                # Verificar se o documento já foi assinado
                if not doc.signed:
                    # Realizar a assinatura do documento
                    doc.signed = True
                    doc.save()
                    return Response(serializer.data)
                else:
                    return Response({"error": "Documento já assinado"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Caso contrário, realizar uma atualização normal do documento
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        doc = self.get_object(pk)
        doc.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserListCreateAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)