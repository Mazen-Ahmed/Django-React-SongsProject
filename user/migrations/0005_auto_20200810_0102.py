# Generated by Django 3.0.8 on 2020-08-10 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0009_auto_20200810_0102'),
        ('user', '0004_auto_20200801_1227'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='likes',
            field=models.ManyToManyField(to='songs.songs'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('Normal', 'Normal'), ('Creator', 'Creator'), ('Premium', 'Premium')], default='Normal', max_length=30),
        ),
    ]
