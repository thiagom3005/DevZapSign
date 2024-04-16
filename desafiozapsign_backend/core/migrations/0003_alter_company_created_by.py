# Generated by Django 5.0.4 on 2024-04-12 00:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_user_primary_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='companies_created', to='core.user'),
        ),
    ]
