# Generated by Django 5.1.2 on 2024-11-10 09:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0013_team_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sponsors',
            name='dealBy',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='event.team'),
        ),
    ]
