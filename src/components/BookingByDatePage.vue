<template>
    <div class="booking-container">
        <div class="booking-by-date right_col layout-full" role="main">
            <div class="row">
                <div class="x_panel">
                    <div class="x_content">
                        <div class="row">
                            <div class="col-sm-12 col-xs-12">
                                <div id="calendar-view">
                                    <div class="card component-calendar">
                                        <div class="card-header component-calendar-header">
                                            <div class="component-calendar-date align-middle text-center">
                                                <a data-rel="simplecalendar-today-date"
                                                    class="btn btn-default btn-light simplecalendar-navigation pull-left"
                                                    href="#" simple-date="2025-01-19">
                                                    Hôm nay </a>

                                                <div class="component-calendar-dateswitcher">
                                                    <div class="btn-group" role="group">
                                                        <a data-rel="simplecalendar-prev-date"
                                                            class="btn btn-light simplecalendar-navigation"
                                                            href="javascript:;" simple-date="2025-01-18">
                                                            <img src="https://manager.datsan247.com/images/arrow-left.svg"
                                                                alt="bar">
                                                        </a>
                                                        <span class="simplecalendar-title"
                                                            data-rel="simplecalendar-title">19 tháng 01 2025</span>
                                                        <a data-rel="simplecalendar-next-date"
                                                            class="btn btn-light simplecalendar-navigation"
                                                            href="javascript:;" simple-date="2025-01-20">
                                                            <img src="https://manager.datsan247.com/images/arrow-right.svg"
                                                                alt="bar">
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="component-calendar-viewswitcher btn-group pull-right"
                                                    role="group">
                                                    <a data-rel="simplecalendar-view-switch" data-view="week" href="#"
                                                        class="btn btn-secondary">Tuần</a>
                                                    <a data-rel="simplecalendar-view-switch" data-view="day" href="#"
                                                        class="btn btn-secondary active">Ngày</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="component-calendar-widget" id="calendar" data-view="day"
                                            data-rel="simplecalendar"
                                            data-date-url="https://manager.datsan247.com/get-simple-calendar/299"
                                            data-start-date="2025-01-19" data-calendar="calendar">
                                            <div class="component-calendar-widget-body day">
                                                <div class="component-calendar-widget-header">
                                                    <table
                                                        class="table table-bordered table-hover simplecalendar-table">
                                                        <thead>
                                                            <tr>
                                                                <th class="simplecalendar-agenda" width="100px">Sân</th>
                                                                <th style="width:90%"> Chủ Nhật 19/01 </th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                <div class="component-calendar-widget-content simplebar-vertical-only"
                                                    data-simplebar="init" data-simplebar-auto-hide="false">
                                                    <!-- <div class="simplebar-track vertical" style="visibility: visible;">
                                                    <div class="simplebar-scrollbar visible"
                                                        style="visibility: visible; top: 0px; height: 193px;"></div>
                                                </div>
                                                <div class="simplebar-track horizontal" style="visibility: hidden;">
                                                    <div class="simplebar-scrollbar"></div>
                                                </div> -->
                                                    <div class="simplebar-scroll-content"
                                                        style="padding-right: 17px; margin-bottom: -34px;">
                                                        <div class="simplebar-content"
                                                            style="padding-bottom: 17px; margin-right: -17px;">
                                                            <table
                                                                class="table table-bordered table-hover simplecalendar simplecalendar-table">
                                                                <tbody>
                                                                    <tr>
                                                                        <td colspan="8" style="border: 0; padding: 0">
                                                                            <table
                                                                                class="table table-bordered table-hover simplecalendar simplecalendar-table">
                                                                                <tbody>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 1 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 1 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a>
                                                                                                <BookingElement
                                                                                                    v-for="(slot, index) in bookingSlots"
                                                                                                    :key="index"
                                                                                                    :time="slot.time"
                                                                                                    :price="slot.price"
                                                                                                    :duration="slot.duration" />
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 2 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 2 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a>
                                                                                            <BookingElement
                                                                                                    v-for="(slot, index) in bookingSlots"
                                                                                                    :key="index"
                                                                                                    :time="slot.time"
                                                                                                    :price="slot.price"
                                                                                                    :duration="slot.duration" />
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 3 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 3 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a>
                                                                                            <BookingElement
                                                                                                    v-for="(slot, index) in bookingSlots"
                                                                                                    :key="index"
                                                                                                    :time="slot.time"
                                                                                                    :price="slot.price"
                                                                                                    :duration="slot.duration" />
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a>
                                                                                            <BookingElement
                                                                                                    v-for="(slot, index) in bookingSlots"
                                                                                                    :key="index"
                                                                                                    :time="slot.time"
                                                                                                    :price="slot.price"
                                                                                                    :duration="slot.duration" />
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a>
                                                                                            <BookingElement
                                                                                                    v-for="(slot, index) in bookingSlots"
                                                                                                    :key="index"
                                                                                                    :time="slot.time"
                                                                                                    :price="slot.price"
                                                                                                    :duration="slot.duration" />
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a>
                                                                                            <BookingElement
                                                                                                    v-for="(slot, index) in bookingSlots"
                                                                                                    :key="index"
                                                                                                    :time="slot.time"
                                                                                                    :price="slot.price"
                                                                                                    :duration="slot.duration" />
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a>
                                                                                            <BookingElement
                                                                                                    v-for="(slot, index) in bookingSlots"
                                                                                                    :key="index"
                                                                                                    :time="slot.time"
                                                                                                    :price="slot.price"
                                                                                                    :duration="slot.duration" />
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123167/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;312a7429-569b-4d50-b6ad-e4c97650e52d&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123167,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123167\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="ND2 Sân 5 (2)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123251/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;376ea0da-db4a-4779-bcd4-1d9e5546aaa1&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123251,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123251\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="ND2 Sân 5 (3)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123335/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;77ea6667-eab1-471b-9e1a-08ee5d42307d&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123335,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123335\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="ND3 Sân 5"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123419/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;12212485-15e8-420c-8bb9-7b1de097981b&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123419,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123419\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="ND3 Sân 5 (2)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123503/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;08fa23de-7c52-40e5-bf49-ada067bd91fd&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123503,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123503\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="ND3 Sân 5 (3)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="component-calendar-cart">
                    <div class="cart-info">
                        <div class="slot-added">Đã chọn <span class="count-added">1</span> lịch</div>
                        <div class="cart-total">Tổng tiền: <span class="total-price">270.000</span>đ</div>
                    </div>
                    <div class="cart-action btn-group-lg">
                        <a class="btn btn-primary mg-bottom-0 booking-appointment"
                            href="https://manager.datsan247.com/vi/all-agenda/299/make-appointments?slot[122790]=2025-01-19">Đặt
                            lịch</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BookingElement from '@/components/BookingElement.vue';


export default {
    name: 'App',
    components: {
        BookingElement,
    },
    data() {
        return {
            bookingSlots: []
        };
    },
    methods: {
        generateSlots() {
            const startHour = 8; // Giờ bắt đầu
            const endHour = 22; // Giờ kết thúc
            const duration = 60; // Thời lượng mỗi slot (phút)
            const pricePerSlot = 55000; // Giá mỗi slot (£)

            const slots = [];
            for (let hour = startHour; hour < endHour; hour++) {
                const time = `${hour.toString().padStart(2, '0')}:00`; // Định dạng giờ (HH:mm)
                slots.push({
                    time,
                    price: this.formatVND(pricePerSlot),
                    duration,
                });
            }

            this.bookingSlots = slots;
        },
        formatVND(priceVND) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVND);
        },
    },
    mounted() {
        this.generateSlots(); // Tạo danh sách slot khi component được mount
    },
}
</script>
<style>
.booking-by-date {
    width: 100%;
}
</style>