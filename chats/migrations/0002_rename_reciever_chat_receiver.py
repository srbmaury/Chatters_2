# Generated by Django 4.0.5 on 2022-10-18 11:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chat',
            old_name='reciever',
            new_name='receiver',
        ),
    ]
