# Generated by Django 3.0.8 on 2020-08-10 14:16

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('songs', '0009_auto_20200810_0102'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='songs',
            name='likes',
        ),
        migrations.AddField(
            model_name='songs',
            name='likes',
            field=models.ManyToManyField(related_name='liked_users', to=settings.AUTH_USER_MODEL),
        ),
    ]