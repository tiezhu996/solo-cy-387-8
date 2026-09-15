from django.db import migrations


def seed_properties(apps, schema_editor):
    Property = apps.get_model('properties', 'Property')
    if Property.objects.exists():
        return
    Property.objects.bulk_create([
        Property(community='海棠公寓', region='滨江区', layout='两室一厅', area=76, rent=5200,
                 deposit=5200, payment='月付', facilities=['空调', '洗衣机', '宽带'],
                 status='待出租', landlord_phone='13800000001'),
        Property(community='梧桐里', region='西湖区', layout='一室一厅', area=48, rent=3900,
                 deposit=3900, payment='季付', facilities=['冰箱', '宽带'],
                 status='已预约', landlord_phone='13800000002'),
        Property(community='江畔华庭', region='滨江区', layout='三室两厅', area=110, rent=7600,
                 deposit=7600, payment='年付', facilities=['空调', '冰箱', '洗衣机', '宽带', '热水器'],
                 status='待出租', landlord_phone='13800000003'),
        Property(community='望月山庄', region='余杭区', layout='两室一厅', area=83, rent=4600,
                 deposit=4600, payment='月付', facilities=['空调', '宽带'],
                 status='待出租', landlord_phone='13800000004'),
    ])


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_properties, migrations.RunPython.noop),
    ]
