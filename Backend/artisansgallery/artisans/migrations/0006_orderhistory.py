# Generated by Django 4.2.2 on 2023-07-10 07:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('artisans', '0005_cart'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='artisans.customer')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='artisans.product')),
            ],
        ),
    ]