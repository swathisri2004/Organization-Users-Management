from django.core.management.base import BaseCommand
from api.models import Organization, User, Membership


class Command(BaseCommand):
    help = 'Seed the database with sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Membership.objects.all().delete()
        User.objects.all().delete()
        Organization.objects.all().delete()

        self.stdout.write('Creating organizations...')
        
        orgs_data = [
            {'name': 'Massachusetts Institute of Technology', 'address': '77 Massachusetts Ave, Cambridge, MA 02139'},
            {'name': 'Stanford University', 'address': '450 Serra Mall, Stanford, CA 94305'},
            {'name': 'Harvard University', 'address': 'Cambridge, MA 02138'},
            {'name': 'Google Inc.', 'address': '1600 Amphitheatre Parkway, Mountain View, CA 94043'},
            {'name': 'Microsoft Corporation', 'address': 'One Microsoft Way, Redmond, WA 98052'},
        ]
        
        orgs = []
        for org_data in orgs_data:
            org = Organization.objects.create(**org_data)
            orgs.append(org)
            self.stdout.write(f'Created organization: {org.name}')

        self.stdout.write('Creating users...')
        
        users_data = [
            {'name': 'John Doe', 'email': 'john.doe@mit.edu', 'role': 'admin', 'organization': orgs[0]},
            {'name': 'Jane Smith', 'email': 'jane.smith@mit.edu', 'role': 'manager', 'organization': orgs[0]},
            {'name': 'Bob Johnson', 'email': 'bob.j@stanford.edu', 'role': 'employee', 'organization': orgs[1]},
            {'name': 'Alice Williams', 'email': 'alice.w@stanford.edu', 'role': 'manager', 'organization': orgs[1]},
            {'name': 'Charlie Brown', 'email': 'charlie.b@harvard.edu', 'role': 'employee', 'organization': orgs[2]},
            {'name': 'Diana Prince', 'email': 'diana.p@harvard.edu', 'role': 'admin', 'organization': orgs[2]},
            {'name': 'Ethan Hunt', 'email': 'ethan.h@google.com', 'role': 'manager', 'organization': orgs[3]},
            {'name': 'Fiona Gallagher', 'email': 'fiona.g@google.com', 'role': 'employee', 'organization': orgs[3]},
            {'name': 'George Martin', 'email': 'george.m@microsoft.com', 'role': 'admin', 'organization': orgs[4]},
            {'name': 'Hannah Montana', 'email': 'hannah.m@microsoft.com', 'role': 'intern', 'organization': orgs[4]},
        ]
        
        users = []
        for user_data in users_data:
            user = User.objects.create(**user_data)
            users.append(user)
            self.stdout.write(f'Created user: {user.name} ({user.email})')

        self.stdout.write('Creating memberships...')
        
        memberships_data = [
            {'user': users[0], 'organization': orgs[1], 'role': 'consultant'},
            {'user': users[2], 'organization': orgs[0], 'role': 'visiting-scholar'},
            {'user': users[4], 'organization': orgs[3], 'role': 'contractor'},
        ]
        
        for membership_data in memberships_data:
            membership = Membership.objects.create(**membership_data)
            self.stdout.write(f'Created membership: {membership}')

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database!'))
        self.stdout.write(f'Total Organizations: {Organization.objects.count()}')
        self.stdout.write(f'Total Users: {User.objects.count()}')
        self.stdout.write(f'Total Memberships: {Membership.objects.count()}')
