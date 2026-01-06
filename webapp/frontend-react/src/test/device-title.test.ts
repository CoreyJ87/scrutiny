import { describe, it, expect } from 'vitest';
import { deviceTitleForType, deviceTitleWithFallback } from '@/utils/device-title';
import type { DeviceModel } from '@/models/device-model';

describe('deviceTitleForType', () => {
  const testCases = [
    {
      device: {
        device_name: 'sda',
        device_type: 'ata',
        model_name: 'Samsung',
      },
      titleType: 'name',
      result: '/dev/sda - Samsung',
    },
    {
      device: {
        device_name: 'nvme0',
        device_type: 'nvme',
        model_name: 'Samsung',
      },
      titleType: 'name',
      result: '/dev/nvme0 - nvme - Samsung',
    },
    {
      device: {},
      titleType: 'serial_id',
      result: '',
    },
    {
      device: {
        device_serial_id: 'ata-WDC_WD140EDFZ-11AXXXXX_9RXXXXXX',
      },
      titleType: 'serial_id',
      result: '/by-id/ata-WDC_WD140EDFZ-11AXXXXX_9RXXXXXX',
    },
    {
      device: {},
      titleType: 'uuid',
      result: '',
    },
    {
      device: {
        device_uuid: 'abcdef-1234-4567-8901',
      },
      titleType: 'uuid',
      result: '/by-uuid/abcdef-1234-4567-8901',
    },
    {
      device: {},
      titleType: 'label',
      result: '',
    },
    {
      device: {
        label: 'custom-device-label',
      },
      titleType: 'label',
      result: 'custom-device-label',
    },
    {
      device: {
        device_label: 'drive-volume-label',
      },
      titleType: 'label',
      result: '/by-label/drive-volume-label',
    },
  ];

  testCases.forEach((test, index) => {
    it(`should correctly format device title ${JSON.stringify(test.device)} (testcase: ${index + 1})`, () => {
      const formatted = deviceTitleForType(test.device as DeviceModel, test.titleType);
      expect(formatted).toEqual(test.result);
    });
  });
});

describe('deviceTitleWithFallback', () => {
  const testCases = [
    {
      device: {
        device_name: 'sda',
        device_type: 'ata',
        model_name: 'Samsung',
      },
      titleType: 'name',
      result: '/dev/sda - Samsung',
    },
    {
      device: {
        device_name: 'nvme0',
        device_type: 'nvme',
        model_name: 'Samsung',
      },
      titleType: 'name',
      result: '/dev/nvme0 - nvme - Samsung',
    },
    {
      // Falls back to name when serial_id is missing
      device: {
        device_name: 'fallback',
        device_type: 'ata',
        model_name: 'fallback',
      },
      titleType: 'serial_id',
      result: '/dev/fallback - fallback',
    },
    {
      device: {
        device_serial_id: 'ata-WDC_WD140EDFZ-11AXXXXX_9RXXXXXX',
      },
      titleType: 'serial_id',
      result: '/by-id/ata-WDC_WD140EDFZ-11AXXXXX_9RXXXXXX',
    },
    {
      // Falls back to name when uuid is missing
      device: {
        device_name: 'fallback',
        device_type: 'ata',
        model_name: 'fallback',
      },
      titleType: 'uuid',
      result: '/dev/fallback - fallback',
    },
    {
      device: {
        device_uuid: 'abcdef-1234-4567-8901',
      },
      titleType: 'uuid',
      result: '/by-uuid/abcdef-1234-4567-8901',
    },
    {
      // Falls back to name when label is missing
      device: {
        device_name: 'fallback',
        device_type: 'ata',
        model_name: 'fallback',
      },
      titleType: 'label',
      result: '/dev/fallback - fallback',
    },
    {
      device: {
        label: 'custom-device-label',
      },
      titleType: 'label',
      result: 'custom-device-label',
    },
    {
      device: {
        device_label: 'drive-volume-label',
      },
      titleType: 'label',
      result: '/by-label/drive-volume-label',
    },
  ];

  testCases.forEach((test, index) => {
    it(`should correctly format device title with fallback ${JSON.stringify(test.device)} (testcase: ${index + 1})`, () => {
      const formatted = deviceTitleWithFallback(test.device as DeviceModel, test.titleType);
      expect(formatted).toEqual(test.result);
    });
  });

  it('should include host_id when present', () => {
    const device = {
      host_id: 'server-01',
      device_name: 'sda',
      device_type: 'ata',
      model_name: 'Samsung',
    } as DeviceModel;

    const formatted = deviceTitleWithFallback(device, 'name');
    expect(formatted).toEqual('server-01 - /dev/sda - Samsung');
  });
});

