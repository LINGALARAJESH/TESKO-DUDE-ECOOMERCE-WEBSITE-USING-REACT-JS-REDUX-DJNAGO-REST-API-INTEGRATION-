# Generated by Django 5.0.4 on 2024-09-05 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_shippingaddress_mobile_alter_shippingaddress_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='shippinPrice',
        ),
        migrations.AddField(
            model_name='order',
            name='Transaction_id',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='country',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='mobile',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='postalCode',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
