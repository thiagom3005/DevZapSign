# Generated by Django 5.0.4 on 2024-04-12 00:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_company_created_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.user'),
        ),
    ]
