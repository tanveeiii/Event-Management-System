# Generated by Django 5.1.2 on 2024-11-17 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0004_auto_20241118_0043'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendees',
            name='ticketId',
            field=models.CharField(max_length=36, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='participants',
            name='registrationId',
            field=models.CharField(max_length=36, primary_key=True, serialize=False),
        ),
    ]
