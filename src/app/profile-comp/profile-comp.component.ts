import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";

export type TlpProfile = {
  tlpGroupId : string;
  profiles: Profile[];
};

export type Profile = {
  profileId: string;
  selected: boolean
  timings: ElementTimings[];
}

export type ElementTimings = {
  deId: string;
  time: string;
  tlp: boolean;
}

export type DecompData = {
  decompId?: string;
  tlpProfiles?: TlpProfile[];
};

export type TlpListTableData = {
  decompId: string;
  tlpGroupId : string;
  selectedProfile: string;
}

@Component({
  selector: "profile-comp",
  templateUrl: "./profile-comp.component.html",
  styleUrls: ["./profile-comp.component.scss"]
})
export class ProfileCompComponent implements OnInit {
  tlpDataSource: MatTableDataSource<TlpListTableData> = new MatTableDataSource([]);
  tlpDisplayedColumns: string[] = ["decompId", "tlpGroupId", "selectedProfile"];
  timingColumns: string[] = ['deId', 'time', 'TLP'];

  profileTableArr: TlpListTableData[] = [];
  profileMap: Map<string, Profile[]> = new Map();
  dataSourceMap: Map<string, MatTableDataSource<ElementTimings>> = new Map();

  selection: SelectionModel<TlpListTableData> = new SelectionModel(false);
  profileDataSource: MatTableDataSource<Profile> = new MatTableDataSource([]);

  decompArr: DecompData[] = [
    {
      decompId: "d-123",
      tlpProfiles: [
        {
          tlpGroupId: 'tlp1',
          profiles: [
          {profileId: "d-123-p1", selected: false, timings:[{deId: 'd1', time: '14.00', tlp: true}, {deId: 'd2', time: '12.00', tlp: true}]},
          {profileId: "d-123-p2", selected: true, timings:[{deId: 'd1', time: '9.00', tlp: false}, {deId: 'd2', time: '10.00', tlp: false}]},
          ]
        },
      ]
    },
    {
      decompId: "d-456",
      tlpProfiles: [
        {
          tlpGroupId: 'tlp2',
          profiles: [
          {profileId: "d-456-p1", selected: false, timings:[{deId: 'd1', time: '14.00', tlp: true}, {deId: 'd2', time: '12.00', tlp: true}]},
          {profileId: "d-456-p2", selected: true, timings:[{deId: 'd1', time: '11.00', tlp: false}, {deId: 'd2', time: '10.00', tlp: false}]},
          ]
        },
      ]
    },
    {
      decompId: "d-789",
      tlpProfiles: [
        {
          tlpGroupId: 'tlp3',
          profiles: [
          {profileId: "d-789-p1", selected: false, timings:[{deId: 'd1', time: '4.00', tlp: true}, {deId: 'd2', time: '6.00', tlp: true}]},
          {profileId: "d-789-p2", selected: true, timings:[{deId: 'd1', time: '8.00', tlp: false}, {deId: 'd2', time: '2.00', tlp: false}]},
          ]
        },
      ]
    },
    {
      decompId: "d1-543",
      tlpProfiles: [
        {
          tlpGroupId: 'tlp4',
          profiles: [
          {profileId: "d1-543-p1", selected: false, timings:[{deId: 'd1', time: '7.00', tlp: true}, {deId: 'd2', time: '12.00', tlp: true}]},
          {profileId: "d1-543-p2", selected: true, timings:[{deId: 'd1', time: '11.00', tlp: false}, {deId: 'd2', time: '5.00', tlp: false}]},
          ]
        },
      ]
    },
    {
      decompId: "d1-765",
      tlpProfiles: [
        {
          tlpGroupId: 'tlp5',
          profiles: [
          {profileId: "d1-765-p1", selected: false, timings:[{deId: 'd1', time: '10.00', tlp: true}, {deId: 'd2', time: '1.50', tlp: true}]},
          {profileId: "d1-765-p2", selected: true, timings:[{deId: 'd1', time: '8.00', tlp: false}, {deId: 'd2', time: '2.00', tlp: false}]},
          ]
        },
      ]
    },
    {
      decompId: "d1-903",
      tlpProfiles: [
        {
          tlpGroupId: 'tlp6',
          profiles: [
          {profileId: "d1-903-p1", selected: false, timings:[{deId: 'd1', time: '14.00', tlp: true}, {deId: 'd2', time: '12.00', tlp: true}]},
          {profileId: "d1-903-p2", selected: true, timings:[{deId: 'd1', time: '11.00', tlp: false}, {deId: 'd2', time: '10.00', tlp: false}]},
          ]
        },
      ]
    },
    {
      decompId: "d1-867",
      tlpProfiles: [
        {
          tlpGroupId: 'tlp7',
          profiles: [
          {profileId: "d1-867-p1", selected: false, timings:[{deId: 'd1', time: '14.00', tlp: true}, {deId: 'd2', time: '12.00', tlp: true}]},
          {profileId: "d1-867-p2", selected: true, timings:[{deId: 'd1', time: '11.00', tlp: false}, {deId: 'd2', time: '10.00', tlp: false}]},
          ]
        },
      ]
    },
    {
      decompId: "d1-341",
      tlpProfiles: [
        {
          tlpGroupId: 'tlp8',
          profiles: [
          {profileId: "d1-341-p1", selected: false, timings:[{deId: 'd1', time: '14.00', tlp: true}, {deId: 'd2', time: '12.00', tlp: true}]},
          {profileId: "d1-341-p2", selected: true, timings:[{deId: 'd1', time: '11.00', tlp: false}, {deId: 'd2', time: '10.00', tlp: false}]},
          ]
        },
      ]
    },

  ];

  constructor() {
  }


  isFaster(profileId: string, elementId: string, t1: string): boolean {
    let profiles: Profile[] = this.profileMap.get(this.selection.selected[0].tlpGroupId);

    let t2: string = profiles.filter(p => p.profileId !== profileId).map(p => {
      let timing = p.timings.find(t => t.deId === t.deId);
      return timing.time;
    })[0];
    
    return t1 < t2;
  }

  loadTlpTableData(){
    this.tlpDataSource.data = [];
    this.tlpDataSource._updateChangeSubscription();

  for(let decomp of this.decompArr){
    for(let tlpRow of decomp.tlpProfiles) {
      for(let profile of tlpRow.profiles) {
        this.dataSourceMap.set(profile.profileId, new MatTableDataSource(profile.timings));
        if(profile.selected) {
          this.tlpDataSource.data.push({decompId: decomp.decompId , tlpGroupId: tlpRow.tlpGroupId, selectedProfile: profile.profileId});
        }
      }
      if(!this.profileMap.has(tlpRow.tlpGroupId)) {
        this.profileMap.set(tlpRow.tlpGroupId, tlpRow.profiles);
      }
    }
  }
    this.tlpDataSource._updateChangeSubscription();
  }

  ngOnInit() {
    this.loadTlpTableData();
  }

  onSelectProfile(profileId: string): void {

    let profiles: Profile[] = this.profileMap.get(this.selection.selected[0].tlpGroupId);
    for(let profile of profiles){
      profile.selected = (profile.profileId === profileId);
    }
    
    this.loadTlpTableData();
  }

  getProfilesOfSelectedTlpGroup(): Profile[] {    
    if(this.selection && this.selection.selected[0]){
      let profiles:Profile[]  = this.profileMap.get(this.selection.selected[0].tlpGroupId);
      console.log(profiles);
      return profiles;
    }
  }

  onSelectTlpRow(row: TlpListTableData): void{
      this.selection.toggle(row);
  }
}
