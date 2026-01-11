import { inject, Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { Workbook, Worksheet } from 'exceljs';

@Injectable({ providedIn: 'root' })
export class Excel {
  readonly #EXCEL_TYPE = 'text/csv;charset=UTF-8';
  readonly #EXCEL_EXTENSION = '.xlsx';

  generateExcel<T extends object>(list: T[], title: string) {
    let excel = this.#makeWorkSheet(title);

    excel.worksheet = this.#makeTitle(excel.worksheet, {
      mergeCellAddress: 'A1:G1',
      titleName: title,
      font: { size: 20 },
    });
    // TODO

    // excel.worksheet = this.#makeHeader(excel.worksheet, this.excelLevel.first, {
    //   spaces: 0,
    //   colors: { bgColor: '696969', fgColor: '696969', fontColor: 'FFFFFF' },
    // });

    // list.forEach((first) => {
    //   excel.worksheet = this.makeData(
    //     excel.worksheet,
    //     { spaces: 0 },
    //     this.excelLevel.first,
    //     first
    //   );
    // });

    excel.worksheet.columns.forEach((col) => (col.width = 20));
    this.#downoadExcel(excel.workbook, title);
  }

  #makeWorkSheet(workSheetname: string): {
    workbook: Workbook;
    worksheet: Worksheet;
  } {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(`${workSheetname}`);
    return { workbook, worksheet };
  }

  #makeTitle(worksheet: Worksheet, config: TitleConfig): Worksheet {
    const titleRow = worksheet.addRow([config.titleName]);
    titleRow.font = {
      name: config.font?.name || 'Cambria',
      family: config.font?.family || 4,
      size: config.font?.size || 16,
      bold: config.font?.bold || false,
    };

    config.alignment = config.alignment || { horizontal: 'center' };
    // titleRow.alignment = { horizontal: config.alignment.horizontal };
    titleRow.alignment = titleRow.alignment || {
      horizontal: config.alignment.horizontal,
    };

    worksheet.addRow([]);

    if (config.mergeCellAddress) worksheet.mergeCells(config.mergeCellAddress);

    return worksheet;
  }

  #makeHeader(
    worksheet: Worksheet,
    columns: Array<Level | NthLevel>,
    config: ExcelConfig
  ): Worksheet {
    const headerRow = worksheet.addRow([
      ...this.#makeSpaces(config.spaces),
      ...(columns || [])
        .map((x: Level | NthLevel) => {
          if (x.hasOwnProperty('parentKey')) {
            return (x as NthLevel).childKeys.map((childKey) => {
              return (childKey as Level).label ?? '--';
            });
          } else {
            return (x as Level).label ?? '--';
          }
        })
        .flat(),
    ]);

    if (config.colors) {
      headerRow.eachCell((cell, number) => {
        if (number > config.spaces) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: config.colors?.fgColor },
            bgColor: { argb: config.colors?.bgColor },
          };
          cell.font = {
            color: { argb: config.colors?.fontColor || 'FFFFFF' },
            bold: true,
          };
        }
      });
    }

    return worksheet;
  }

  #makeSpaces(space: number): string[] {
    const spaces = [];

    for (let i = 0; i < space; i++) {
      spaces.push('');
    }
    return spaces;
  }

  #makeData(
    worksheet: Worksheet,
    config: ExcelConfig,
    columns: Array<Level | NthLevel>,
    data: any
  ): Worksheet {
    let columnData: any = [];

    // columns.forEach((x) => {
    //   if (x.hasOwnProperty('parentKey')) {
    //     (x as NthLevel).childKeys.forEach((childKey) => {
    //       columnData.push(data[(childKey as Level).key] ?? '--');
    //     });
    //   } else if (typeof data[(x as Level).key] === 'boolean') {
    //     columnData.push(
    //       this._translate.instant(`BOOLEAN.${data[(x as Level).key]}`)
    //     );
    //   } else if ((x as Level).key === 'timeline') {
    //     columnData.push(`${data['checkIn']} -- ${data['checkOut']}`);
    //   } else if ((x as Level).key === 'reservationPaymentStatus') {
    //     columnData.push(
    //       this._translate.instant(
    //         `RESERVATIONS.ReservationPaymentStatusEnum.${
    //           data[(x as Level).key]
    //         }`
    //       )
    //     );
    //   } else if ((x as Level).key === 'productsConsumedPaymentStatus') {
    //     columnData.push(
    //       this._translate.instant(
    //         `ProductsConsumedPaymentStatusEnum.${data[(x as Level).key]}`
    //       )
    //     );
    //   } else if (
    //     (x as Level).key === 'totalPrice' ||
    //     (x as Level).key === 'remainingAmount' ||
    //     (x as Level).key === 'roomTariff'
    //   ) {
    //     columnData.push(
    //       `${data[(x as Level).key]} ${
    //         this._genericService.hotelBehaviourSubject.value?.currency
    //       }`
    //     );
    //   } else {
    //     columnData.push(data[(x as Level).key] ?? '--');
    //   }
    // });

    // worksheet.addRow([...this.makeSpaces(config.spaces), ...columnData]);

    return worksheet;
  }

  #downoadExcel(workbook: Workbook, filename: string): void {
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], {
        type: this.#EXCEL_TYPE,
      });
      // saveAs(blob, `${filename}${this.#EXCEL_EXTENSION}`);
    });
  }
}

export interface TitleConfig {
  titleName: string;
  font?: Font;
  alignment?: Alignment;
  mergeCellAddress: string;
}

export interface Font {
  name?: string;
  family?: number;
  size?: number;
  bold?: boolean;
}

export interface Alignment {
  horizontal: string;
}

export interface Level {
  key: string;
  label: string;
}
export interface NthLevel {
  parentKey: string;
  childKeys: (Level | NthLevel)[];
}

export interface ExcelConfig {
  spaces: number;
  colors?: ExcelColor;
}

export interface ExcelColor {
  fgColor: string;
  bgColor: string;
  fontColor: string;
}
