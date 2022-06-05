# Generated by Django 4.0.4 on 2022-06-04 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_messages_sender'),
    ]

    operations = [
        migrations.CreateModel(
            name='Events',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_type', models.CharField(max_length=10)),
                ('user_id', models.CharField(max_length=100)),
                ('product_id', models.CharField(max_length=100)),
                ('category_code', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='product',
            name='isSold',
            field=models.BooleanField(default=False),
        ),
    ]