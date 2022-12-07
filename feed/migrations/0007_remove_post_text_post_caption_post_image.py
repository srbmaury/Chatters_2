# Generated by Django 4.0.5 on 2022-10-13 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feed', '0006_problem'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='text',
        ),
        migrations.AddField(
            model_name='post',
            name='caption',
            field=models.TextField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(default='../static/image/default.png', upload_to='problems'),
        ),
    ]
