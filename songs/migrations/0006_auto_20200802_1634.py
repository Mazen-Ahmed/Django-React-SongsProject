# Generated by Django 3.0.8 on 2020-08-02 16:34

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0005_songs_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songs',
            name='file',
            field=models.FileField(upload_to='songs', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['mp3'])]),
        ),
    ]
