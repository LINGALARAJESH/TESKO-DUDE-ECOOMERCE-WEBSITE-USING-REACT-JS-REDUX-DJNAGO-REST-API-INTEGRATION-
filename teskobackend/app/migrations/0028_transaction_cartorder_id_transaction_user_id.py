# Generated by Django 5.0.4 on 2024-09-11 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0027_remove_transaction_paidamount_remove_transaction__id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='Cartorder_id',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Order ID'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='user_id',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Order ID'),
        ),
    ]
