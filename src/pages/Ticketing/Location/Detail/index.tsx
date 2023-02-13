import { qiankunJump } from '@/utils/qiankunJump';
import { PageContainer, ProColumnType, ProDescriptions } from '@ant-design/pro-components';
import { useParams, useIntl, FormattedMessage } from '@umijs/max';
import { Fragment, useEffect, useState } from 'react';
import type {
  Locationv1Location,
  V1UpdateLocation,
  V1UpdateLocationRequest,
} from '@gosaas/commerce-api';
import { LocationServiceApi } from '@gosaas/commerce-api';
import { Button, message, Modal, Upload } from 'antd';
import UpdateForm from '../components/UpdateForm';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

const ButtonGroup = Button.Group;
const service = new LocationServiceApi();

const columns: ProColumnType<Locationv1Location>[] = [
  {
    title: <FormattedMessage id="ticketing.location.logo" defaultMessage="Logo" />,
    dataIndex: ['logo', 'url'],
    valueType: 'image',
  },
  {
    title: <FormattedMessage id="ticketing.location.name" defaultMessage="Location Name" />,
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: (
      <FormattedMessage id="ticketing.location.shortDesc" defaultMessage="Short Description" />
    ),
    dataIndex: 'shortDesc',
    valueType: 'text',
  },
  {
    title: (
      <FormattedMessage id="ticketing.location.publicPhone" defaultMessage="Public Contact Phone" />
    ),
    dataIndex: 'publicContact.phone',
    valueType: 'text',
  },
  {
    title: (
      <FormattedMessage id="ticketing.location.publicEmail" defaultMessage="Public Contact Email" />
    ),
    dataIndex: 'publicContact.email',
    valueType: 'text',
  },
  {
    title: <FormattedMessage id="ticketing.location.rating" defaultMessage="Rating" />,
    dataIndex: 'rating',
    valueType: 'rate',
  },

  {
    title: <FormattedMessage id="common.createdAt" defaultMessage="CreatedAt" />,
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
  {
    title: <FormattedMessage id="common.updatedAt" defaultMessage="UpdatedAt" />,
    dataIndex: 'updatedAt',
    valueType: 'dateTime',
  },
];

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const MediasList = (props: { data?: Locationv1Location }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={(props?.data?.medias ?? []).map((p) => {
          return { uid: p.id!, name: p.name || '', ...p };
        })}
        onPreview={handlePreview}
        showUploadList={{ showRemoveIcon: false }}
      ></Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

const LocationDetail = () => {
  const { id } = useParams() || {};
  if (!id) {
    qiankunJump('/location');
  }
  const intl = useIntl();
  const [data, setData] = useState<Locationv1Location>();
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const reload = async () => {
    service
      .locationServiceGetLocation({ id: id! })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        if (err?.code === 404) {
          qiankunJump('/location');
        }
      });
  };

  useEffect(() => {
    if (id) {
      reload();
    }
  }, [id]);

  const [tabStatus, seTabStatus] = useState<string>('hall');

  const handleUpdate = async (fields: V1UpdateLocationRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.updating', defaultMessage: 'Updating...' }),
    );
    try {
      await service.locationServiceUpdateLocation2({
        body: fields,
        locationId: fields.location!.id!,
      });
      hide();
      message.success(
        intl.formatMessage({ id: 'common.updated', defaultMessage: 'Update Successfully' }),
      );
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  const action = (
    <Fragment>
      <ButtonGroup>
        <Button
          onClick={() => {
            handleUpdateModalVisible(true);
          }}
        >
          <FormattedMessage id="common.edit" defaultMessage="Edit" />
        </Button>
      </ButtonGroup>
    </Fragment>
  );
  return (
    <PageContainer
      title=""
      extra={action}
      content={
        <ProDescriptions<Locationv1Location>
          title={data?.name}
          columns={columns}
          dataSource={data}
        />
      }
      // extraContent={extra}
      tabActiveKey={tabStatus}
      onTabChange={(tabActiveKey: string) => {
        seTabStatus(tabActiveKey);
      }}
      tabList={[
        {
          key: 'hall',
          tab: intl.formatMessage({ id: 'ticketing.location.hall', defaultMessage: 'Halls' }),
        },
        {
          key: 'medias',
          tab: intl.formatMessage({ id: 'ticketing.location.medias', defaultMessage: 'Medias' }),
        },
      ]}
    >
      {tabStatus === 'medias' && <MediasList data={data}></MediasList>}
      <UpdateForm
        onSubmit={async (value) => {
          let success = false;
          success = await handleUpdate({ location: value as V1UpdateLocation });

          if (success) {
            handleUpdateModalVisible(false);
            await reload();
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
        updateModalVisible={updateModalVisible}
        values={
          {
            ...(data || {}),
          } as any
        }
      />
    </PageContainer>
  );
};

export default LocationDetail;
