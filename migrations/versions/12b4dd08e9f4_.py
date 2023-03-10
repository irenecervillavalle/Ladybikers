"""empty message

Revision ID: 12b4dd08e9f4
Revises: b9b4d5421983
Create Date: 2023-03-02 19:49:38.589070

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12b4dd08e9f4'
down_revision = 'b9b4d5421983'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuario', schema=None) as batch_op:
        batch_op.add_column(sa.Column('telefono', sa.Integer(), nullable=False))
        batch_op.create_unique_constraint(None, ['telefono'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuario', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('telefono')

    # ### end Alembic commands ###
