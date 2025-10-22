from rest_framework import serializers
from .models import Organization, User, Membership


class OrganizationSerializer(serializers.ModelSerializer):
    user_count = serializers.SerializerMethodField()

    class Meta:
        model = Organization
        fields = ['id', 'name', 'address', 'created_at', 'user_count']
        read_only_fields = ['created_at']

    def get_user_count(self, obj):
        return obj.users.count()


class UserSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'organization', 'organization_name', 'created_at']
        read_only_fields = ['created_at']

    def validate_email(self, value):
        instance = self.instance
        if instance and User.objects.filter(email=value).exclude(id=instance.id).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        elif not instance and User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value


class MembershipSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    organization_name = serializers.CharField(source='organization.name', read_only=True)

    class Meta:
        model = Membership
        fields = ['id', 'user', 'user_name', 'user_email', 'organization', 'organization_name', 'role', 'joined_at']
        read_only_fields = ['joined_at']
