from django.db import models


class Status(models.Model):
    chain_id = models.PositiveIntegerField(unique=True)
    indexed_block = models.PositiveBigIntegerField()

    class Meta:
        verbose_name_plural = "statuses"


class Token(models.Model):
    token_id = models.PositiveIntegerField(unique=True)
    owner = models.CharField(max_length=255, verbose_name='Owners')
    image = models.FileField(upload_to='images/')
    chain_id = models.PositiveIntegerField()
    tx = models.CharField(max_length=255)
    block_number = models.PositiveBigIntegerField()
    skill = models.IntegerField(default=0)
    date_updated = models.DateTimeField(auto_now=True)
    blockchain_timestamp = models.PositiveBigIntegerField(null=True, default=None)
    token_url = models.CharField(max_length=512)

    def __str__(self):
        return f"<Token Object>: Owner {self.owner} has token with id={self.token_id} on chain with id={self.chain_id}."