from django.contrib import admin
from .models import Organization, User, Membership


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'address', 'created_at']
    search_fields = ['name', 'address']
    list_filter = ['created_at']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'role', 'organization', 'created_at']
    search_fields = ['name', 'email']
    list_filter = ['role', 'organization', 'created_at']


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'organization', 'role', 'joined_at']
    search_fields = ['user__name', 'organization__name']
    list_filter = ['role', 'joined_at']
