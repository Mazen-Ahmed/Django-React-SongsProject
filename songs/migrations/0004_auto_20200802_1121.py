# Generated by Django 3.0.8 on 2020-08-02 11:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0003_songscategory_cover'),
    ]

    operations = [
        migrations.RenameField(
            model_name='songs',
            old_name='date',
            new_name='upload_date',
        ),
    ]