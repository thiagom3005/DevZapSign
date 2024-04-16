from django.db import models
from django.utils import timezone

class BaseModel(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_update_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.last_update_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.__class__.__name__} - {self.id}"

class Company(BaseModel):
    LANG_CHOICES = (
        ('pt', 'Portuguese'),
        ('es', 'Spanish'),
        ('en', 'English'),
    )
    
    name = models.CharField(max_length=255)
    locale = models.CharField(max_length=50, default='-03:00')
    lang = models.CharField(max_length=2, choices=LANG_CHOICES, default='pt')
    created_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, related_name='created_companies')
    users = models.ManyToManyField('User', related_name='managed_companies', blank=True)
    docs = models.ManyToManyField('Doc', related_name='associated_companies', blank=True)

    def __str__(self):
        return self.name

class Doc(BaseModel):
    name = models.CharField(max_length=255)
    deleted = models.BooleanField(default=False)
    date_limit_to_sign = models.DateTimeField()
    signed = models.BooleanField(default=False)
    company = models.ForeignKey(Company, related_name='documents', on_delete=models.CASCADE)
    created_by = models.ForeignKey('User', related_name='created_documents', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class User(BaseModel):
    email = models.EmailField(max_length=255, unique=True)
    last_password_definition_at = models.DateTimeField(default=timezone.now)
    email_verified = models.BooleanField(default=False)
    password = models.CharField(max_length=255)
    companies = models.ManyToManyField(Company, related_name='users_associated', blank=True)
    documents = models.ManyToManyField(Doc, related_name='users_associated', blank=True)
    primary_company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name='primary_user')

    def __str__(self):
        return self.email