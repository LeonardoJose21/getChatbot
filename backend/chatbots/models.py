from django.db import models
# from django.forms import JSONField

class UserChatbot(models.Model):
    DATA_SOURCE_CHOICES = [
        ('text', 'Text'),
        ('document', 'Document'),
        ('url', 'URL'),
    ]

    MODEL_CHOICES = [
        ('gpt', 'GPT'),
        ('bert', 'BERT'),
        ('llama', 'LLaMA'),
        # Add other AI LLM models as needed
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    data_source = models.CharField(max_length=20, choices=DATA_SOURCE_CHOICES, null=False)
    vector_store_path = models.CharField(max_length=500, blank=True, null=True)
    model = models.CharField(max_length=50, choices=MODEL_CHOICES, null=False)
    icon = models.CharField(max_length=255, blank=True, null=True)
    icon_image = models.BinaryField(null=True)
    starter_messages = models.JSONField(default=dict)  # Removed 'null' and added a default
    quick_actions = models.JSONField(default=dict)  # Removed 'null' and added a default
    target_audience = models.CharField(max_length=255, blank=True, null=True)
    lead_information = models.JSONField(default=dict)
    cta_link = models.URLField(max_length=500, blank=True, null=True)
    user_id = models.IntegerField(null=False)
    theme = models.CharField(max_length=50, choices=[('light', 'Light'), ('dark', 'Dark')], null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name or f"Chatbot {self.id}"