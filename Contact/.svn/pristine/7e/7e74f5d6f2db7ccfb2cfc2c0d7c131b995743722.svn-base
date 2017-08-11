import { Injectable } from '@angular/core';


export class Filter {
    public parameters: string = '';
    public Pattern: string = '';
    public PageNumber: number = 0;
    public start: number = 0;
    public PageSize: number = 15;
    public ExecutionHints: boolean = false;
    public UseCurrentClient: boolean = false;
    public IncludeNonActiveItems: boolean = false;
    public orderBy: [{
        'Field': string,
        'Desc': boolean
    }];
}
export class ListsOption {
    public FilterRequest: Filter;
    public CompanyCode: number;
    constructor(){
    }
}

export class DetailOption {
    public id: number;
    public CompanyCode: number;
}

export class ImgOption {
    public CompanyCode: number;
    public OwnerId: number;
    public UseThumbnail: boolean;
}

export class BPOption{
    public CompanyCode: number;
    public BpId: number;
}

@Injectable()
export class requestOptionService {
    private listsOption: ListsOption;
    private detailOption: DetailOption;
    private imgOption: ImgOption;
    private bpOption: BPOption;

    constructor(){
        this.listsOption = new ListsOption();
        this.detailOption = new DetailOption();
        this.imgOption = new ImgOption();
        this.bpOption = new BPOption();
    }

    public setCompanyCode(code): void{
        this.listsOption.CompanyCode = code;
        this.detailOption.CompanyCode = code;
        this.imgOption.CompanyCode = code;
        this.bpOption.CompanyCode = code;
    }
    private initFilterRequest(): void{
        this.listsOption.FilterRequest = {
            parameters: '',
            Pattern: '',
            PageNumber: 0,
            start: 0,
            PageSize: 15,
            ExecutionHints: false,
            UseCurrentClient: false,
            IncludeNonActiveItems: false,
            orderBy: [{
                'Field': '',
                'Desc': true
            }]
        };
    }

    public getListsOption(): any{
        this.initFilterRequest();
        return this.listsOption;
    }

    public setDataId(id): void{
        this.detailOption.id = id;
        this.imgOption.OwnerId = id;
    }

    public getDetailOption(): any{
        return this.detailOption;
    }

    public getImgOption(): any{
        this.imgOption.UseThumbnail = false;
        return this.imgOption;
    }

    public setBpId(id): void{
        this.bpOption.BpId = id;
    }

    public getBPOption(): any{
        return this.bpOption;
    }
}

