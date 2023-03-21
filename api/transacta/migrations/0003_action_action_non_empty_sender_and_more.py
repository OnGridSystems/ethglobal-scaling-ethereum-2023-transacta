# Generated by Django 4.1.7 on 2023-03-21 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transacta', '0002_remove_token_ipfs_uri_image_token_token_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(max_length=255, verbose_name='Senders')),
                ('receiver', models.CharField(max_length=255, verbose_name='Receivers')),
                ('direction', models.IntegerField(choices=[(1, 'Deposit'), (2, 'Withdraw')])),
                ('token_id', models.PositiveIntegerField()),
                ('l1_tx', models.CharField(max_length=255)),
                ('l2_tx', models.CharField(max_length=255)),
                ('status', models.IntegerField(choices=[(1, 'New'), (2, 'Done')], default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddConstraint(
            model_name='action',
            constraint=models.CheckConstraint(check=models.Q(('sender', ''), _negated=True), name='non_empty_sender'),
        ),
        migrations.AddConstraint(
            model_name='action',
            constraint=models.CheckConstraint(check=models.Q(('receiver', ''), _negated=True), name='non_empty_receiver'),
        ),
        migrations.AddConstraint(
            model_name='action',
            constraint=models.CheckConstraint(check=models.Q(('l1_tx', ''), _negated=True), name='non_empty_l1_tx'),
        ),
        migrations.AddConstraint(
            model_name='action',
            constraint=models.CheckConstraint(check=models.Q(('l2_tx', ''), _negated=True), name='non_empty_l2_tx'),
        ),
        migrations.AddConstraint(
            model_name='action',
            constraint=models.CheckConstraint(check=models.Q(('direction__in', [1, 2])), name='Direction_choices'),
        ),
        migrations.AddConstraint(
            model_name='action',
            constraint=models.CheckConstraint(check=models.Q(('status__in', [1, 2])), name='Status_choices'),
        ),
    ]