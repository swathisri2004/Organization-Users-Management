from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from .models import Organization, User, Membership
from .serializers import OrganizationSerializer, UserSerializer, MembershipSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    @action(detail=False, methods=['get'])
    def stats(self, request):
        total_orgs = Organization.objects.count()
        return Response({'total_organizations': total_orgs})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        org_id = self.request.query_params.get('organization', None)
        if org_id is not None:
            queryset = queryset.filter(organization_id=org_id)
        return queryset

    @action(detail=False, methods=['get'])
    def stats(self, request):
        total_users = User.objects.count()
        users_by_role = User.objects.values('role').annotate(count=Count('role'))
        return Response({
            'total_users': total_users,
            'users_by_role': users_by_role
        })


class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    def get_queryset(self):
        queryset = Membership.objects.all()
        org_id = self.request.query_params.get('organization', None)
        user_id = self.request.query_params.get('user', None)
        
        if org_id is not None:
            queryset = queryset.filter(organization_id=org_id)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        
        return queryset
