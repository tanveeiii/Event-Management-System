# Generated by Django 5.1.2 on 2024-11-09 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0012_team_teamname'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='image',
            field=models.TextField(default='hello'),
            preserve_default=False,
        ),
    ]