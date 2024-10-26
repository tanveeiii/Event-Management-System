# Generated by Django 5.1.2 on 2024-10-23 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendees',
            name='ticketId',
            field=models.UUIDField(editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='participants',
            name='registrationId',
            field=models.UUIDField(editable=False, primary_key=True, serialize=False),
        ),
    ]