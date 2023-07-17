# Generated by Django 4.2.2 on 2023-07-04 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artisans', '0002_remove_user_is_artisan'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_customer',
        ),
        migrations.AddField(
            model_name='user',
            name='is_artisan',
            field=models.BooleanField(default=False),
        ),
    ]