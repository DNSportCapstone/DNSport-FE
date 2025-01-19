<template>
    <div class="booking-container">
        <div class="right_col layout-full" role="main" style="min-height: 861px;">
            <div class="row">
                <div class="x_panel">
                    <div class="x_content">
                        <input type="hidden" id="data-token" value="0AINEQGmAi7NjpsNhzEaawWNkMxdnWbr4uTvbdzj">
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
                                                            href="javascript:;" simple-date="2025-01-06">
                                                            <img src="https://manager.datsan247.com/images/arrow-left.svg"
                                                                alt="bar">
                                                        </a>
                                                        <span class="simplecalendar-title"
                                                            data-rel="simplecalendar-title">13 tháng 01 - 19 tháng 01
                                                            2025</span>
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
                                                        class="btn btn-secondary active">Tuần</a>
                                                    <a data-rel="simplecalendar-view-switch" data-view="day" href="#"
                                                        class="btn btn-secondary">Ngày</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="component-calendar-widget" id="calendar" data-view="week"
                                            data-rel="simplecalendar"
                                            data-date-url="https://manager.datsan247.com/get-simple-calendar/299"
                                            data-start-date="2025-01-19" data-calendar="calendar">
                                            <div class="component-calendar-widget-body week">
                                                <div class="component-calendar-widget-header">
                                                    <table
                                                        class="table table-bordered table-hover simplecalendar-table">
                                                        <thead>
                                                            <tr>
                                                                <th class="simplecalendar-time"></th>
                                                                <th class="simplecalendar-agenda">Sân</th>
                                                                <th class="simplecalendar-date"> Thứ Hai 13/01 </th>
                                                                <th class="simplecalendar-date"> Thứ Ba 14/01 </th>
                                                                <th class="simplecalendar-date"> Thứ Tư 15/01 </th>
                                                                <th class="simplecalendar-date"> Thứ Năm 16/01 </th>
                                                                <th class="simplecalendar-date"> Thứ Sáu 17/01 </th>
                                                                <th class="simplecalendar-date"> Thứ Bảy 18/01 </th>
                                                                <th class="simplecalendar-date"> Chủ Nhật 19/01 </th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                <div class="component-calendar-widget-content simplebar-vertical-only"
                                                    data-simplebar="init" data-simplebar-auto-hide="false">
                                                    <div class="simplebar-track vertical" style="visibility: visible;">
                                                        <div class="simplebar-scrollbar visible"
                                                            style="visibility: visible; top: 558px; height: 111px;">
                                                        </div>
                                                    </div>
                                                    <div class="simplebar-track horizontal" style="visibility: hidden;">
                                                        <div class="simplebar-scrollbar"></div>
                                                    </div>
                                                    <div class="simplebar-scroll-content"
                                                        style="padding-right: 17px; margin-bottom: -34px;">
                                                        <div class="simplebar-content"
                                                            style="padding-bottom: 17px; margin-right: -17px;">
                                                            <table
                                                                class="table table-bordered table-hover simplecalendar-table1 simplecalendar simplecalendar-table">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="simplecalendar-time">
                                                                            <strong>18:00</strong>
                                                                        </td>
                                                                        <td colspan="8" style="border: 0; padding: 0">
                                                                            <BookingContent/>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="simplecalendar-time" width="83px">
                                                                            <strong>18:30</strong>
                                                                        </td>
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122370/2025-01-19/1092"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;fe044976-537c-4ed0-a99b-a7b74606c21e&quot;,&quot;title&quot;:&quot;1.200.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122370,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 1 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122370\/2025-01-19\/1092&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:1200000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1092,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:838,&quot;created_at&quot;:&quot;2025-01-07 11:40:22&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:53&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:1200000,&quot;pending&quot;:1,&quot;slots_count&quot;:28,&quot;translations&quot;:[{&quot;id&quot;:2186,&quot;subdivision_id&quot;:1092,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2187,&quot;subdivision_id&quot;:1092,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1092}">
                                                                                                <div data-agenda="Nguyên Đức 1 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    1.200.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 2 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 2 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122998/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;ddf75da8-803a-459c-a6c6-06d3c8b07e80&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122998,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 2 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122998\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="Nguyên Đức 2 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 3 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 3 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123586/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;81a6da57-3745-45b0-a8c7-16aa8d4f3401&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123586,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 3 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123586\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="Nguyên Đức 3 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123082/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;99648473-6287-4932-9397-e90bd3780808&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123082,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123082\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="ND2 Sân 5"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123166/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;f620ec3e-1333-4a03-b0a6-3396502ecdaa&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123166,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123166\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123250/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;4da1eff9-f250-4cad-a82d-154742c0f3d0&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123250,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123250\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123334/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;e1b8cb72-96f6-4bfd-8303-6f1a81f3f556&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123334,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123334\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123418/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;8bc122a4-430f-43cb-8ab2-f2b3d08e2dd0&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123418,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123418\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123502/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;9d2a9239-d2bb-4c92-a905-242818f14ef4&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737286200,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123502,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123502\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                    <tr>
                                                                        <td class="simplecalendar-time" width="83px">
                                                                            <strong>19:00</strong>
                                                                        </td>
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 2 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 2 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 3 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 3 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122535/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;bceef3fb-9b32-451e-b1cd-c0683de475aa&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737288000,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122535,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122535\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122787/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;ca0b41bb-fe9f-4ce8-bc97-283aad69d6f3&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737288000,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122787,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122787\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5 (2)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122913/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;75449574-bd17-470b-8454-060d4fb518c2&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737288000,&quot;end&quot;:&quot;2025-01-19 20:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122913,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122913\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5 (3)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="simplecalendar-time" width="83px">
                                                                            <strong>20:00</strong>
                                                                        </td>
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122371/2025-01-19/1092"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;67a4649b-c224-455b-89fe-38d3c8209687&quot;,&quot;title&quot;:&quot;1.200.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122371,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 1 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122371\/2025-01-19\/1092&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:1200000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1092,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:838,&quot;created_at&quot;:&quot;2025-01-07 11:40:22&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:53&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:1200000,&quot;pending&quot;:1,&quot;slots_count&quot;:28,&quot;translations&quot;:[{&quot;id&quot;:2186,&quot;subdivision_id&quot;:1092,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2187,&quot;subdivision_id&quot;:1092,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1092}">
                                                                                                <div data-agenda="Nguyên Đức 1 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    1.200.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 2 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 2 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122999/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;39baacc9-afef-4e2b-81df-388d33b89ae8&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122999,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 2 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122999\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="Nguyên Đức 2 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 3 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 3 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123587/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;dca6051a-b3e7-4c4d-8332-43c2ecdf001b&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123587,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 3 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123587\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="Nguyên Đức 3 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122536/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;5e2bcc9b-a7a7-4e2a-8fd0-1bdf1b1d1c4a&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122536,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122536\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122788/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;91a380fd-b2e7-402d-8e50-61fe16753a4a&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122788,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122788\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5 (2)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122914/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;a6222ae0-3356-4a81-91db-5977d67992fd&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122914,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122914\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5 (3)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123083/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;081fa751-ab53-41f9-9842-fc9d41991fb7&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123083,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123083\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="ND2 Sân 5"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123167/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;bd6086ea-419c-4b2f-952c-e753b60df8d2&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123167,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123167\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123251/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;e96f260d-a3e7-441b-97a2-6d5faa215c29&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123251,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123251\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123335/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;7d34781f-d728-4420-89cd-f34605672081&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123335,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123335\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123419/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;3a92fd98-3972-4088-aa01-458dc28c6772&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123419,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123419\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123503/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;b59798fa-8c8c-4200-a839-60c3557638ec&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737291600,&quot;end&quot;:&quot;2025-01-19 21:30:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123503,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123503\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                    <tr>
                                                                        <td class="simplecalendar-time" width="83px">
                                                                            <strong>21:00</strong>
                                                                        </td>
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 2 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 2 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 3 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 3 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122537/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;e6115048-e363-4bfe-bcfb-84fde6922ce9&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737295200,&quot;end&quot;:&quot;2025-01-19 22:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122537,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122537\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122789/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;9a855bd5-b837-4f9a-8fd6-88ec40c42735&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737295200,&quot;end&quot;:&quot;2025-01-19 22:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122789,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122789\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5 (2)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122915/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;05cd810d-e944-482c-ad05-daf013c383e8&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737295200,&quot;end&quot;:&quot;2025-01-19 22:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122915,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122915\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5 (3)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="simplecalendar-time" width="83px">
                                                                            <strong>21:30</strong>
                                                                        </td>
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122372/2025-01-19/1092"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;8a0dcae4-a4f6-4327-b4f8-67ea2e121986&quot;,&quot;title&quot;:&quot;1.200.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122372,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 1 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122372\/2025-01-19\/1092&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:1200000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1092,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:838,&quot;created_at&quot;:&quot;2025-01-07 11:40:22&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:53&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:1200000,&quot;pending&quot;:1,&quot;slots_count&quot;:28,&quot;translations&quot;:[{&quot;id&quot;:2186,&quot;subdivision_id&quot;:1092,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2187,&quot;subdivision_id&quot;:1092,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1092}">
                                                                                                <div data-agenda="Nguyên Đức 1 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    1.200.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 2 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 2 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123000/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;1959b90f-3476-40cf-aa08-8f193edde753&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123000,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 2 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123000\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="Nguyên Đức 2 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 3 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 3 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123588/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;d7b98746-5349-47ac-802f-31e3cbd94a04&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123588,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;Nguy\u00ean \u0110\u1ee9c 3 S\u00e2n 7&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123588\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="Nguyên Đức 3 Sân 7"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123084/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;ef40d3fe-b382-434a-8490-111dbdffa731&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123084,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123084\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
                                                                                                <div data-agenda="ND2 Sân 5"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    900.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123168/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;ae11de4a-74ac-4007-acf4-dbedc4634549&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123168,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123168\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123252/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;d75b5569-2875-496d-ba51-46ae0f8b00fd&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123252,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND2 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123252\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123336/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;db92ea40-843a-49e6-85f1-66782cd0e4b9&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123336,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123336\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123420/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;928691cf-31fb-4005-97bf-73ae7749a5f8&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123420,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123420\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123504/2025-01-19/1094"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;7218acfb-74a1-450c-bcd0-3623d9ad0ccd&quot;,&quot;title&quot;:&quot;900.000 \u0111&quot;,&quot;start&quot;:1737297000,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:123504,&quot;subdivision_name&quot;:&quot;Sau 17h ND2&quot;,&quot;agenda_name&quot;:&quot;ND3 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123504\/2025-01-19\/1094&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:900000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1094,&quot;type&quot;:0,&quot;minute_per_point&quot;:90,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:41:23&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:900000,&quot;pending&quot;:1,&quot;slots_count&quot;:224,&quot;translations&quot;:[{&quot;id&quot;:2190,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2191,&quot;subdivision_id&quot;:1094,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND2&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1094}">
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
                                                                    <tr>
                                                                        <td class="simplecalendar-time" width="83px">
                                                                            <strong>22:00</strong>
                                                                        </td>
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
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 2 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 2 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr
                                                                                        data-agenda="Nguyên Đức 3 Sân 7">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>Nguyên Đức 3 Sân
                                                                                                7</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122538/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;36b59286-24ca-4ae4-8c76-1472b7e26310&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737298800,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122538,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122538\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122790/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;8963ea6c-0b7b-459e-8c14-15fc07ae8e62&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737298800,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122790,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5 (2)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122790\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5 (2)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND1 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND1 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"><a
                                                                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/122916/2025-01-19/1099"
                                                                                                class="slot-item"
                                                                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                                                                data-slot="{&quot;id&quot;:&quot;fbbc1486-1bc9-4911-9528-bfb3a58daf17&quot;,&quot;title&quot;:&quot;270.000 \u0111&quot;,&quot;start&quot;:1737298800,&quot;end&quot;:&quot;2025-01-19 23:00:00&quot;,&quot;backgroundColor&quot;:&quot;#FFFFFF&quot;,&quot;textColor&quot;:&quot;#000000&quot;,&quot;borderLeft&quot;:&quot;#CEDFED&quot;,&quot;create_appointment&quot;:true,&quot;block&quot;:false,&quot;slotID&quot;:122916,&quot;subdivision_name&quot;:&quot;Sau 17h ND1&quot;,&quot;agenda_name&quot;:&quot;ND1 S\u00e2n 5 (3)&quot;,&quot;max_appointment&quot;:1,&quot;type&quot;:0,&quot;render&quot;:true,&quot;url&quot;:&quot;https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/122916\/2025-01-19\/1099&quot;,&quot;priority&quot;:1,&quot;day_number&quot;:0,&quot;break&quot;:false,&quot;price&quot;:270000,&quot;flash_sale&quot;:null,&quot;subdivision&quot;:{&quot;id&quot;:1099,&quot;type&quot;:0,&quot;minute_per_point&quot;:60,&quot;visible_to&quot;:0,&quot;color&quot;:null,&quot;bg_color&quot;:null,&quot;can_booked_until&quot;:0,&quot;book_ahead_time&quot;:30,&quot;max_appoinment&quot;:1,&quot;urgency&quot;:0,&quot;grant_user&quot;:838,&quot;created_by&quot;:838,&quot;updated_by&quot;:null,&quot;created_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;updated_at&quot;:&quot;2025-01-07 11:54:57&quot;,&quot;deleted_at&quot;:null,&quot;temporary&quot;:0,&quot;status_id&quot;:null,&quot;dummy&quot;:0,&quot;client_id&quot;:299,&quot;price&quot;:270000,&quot;pending&quot;:1,&quot;slots_count&quot;:126,&quot;translations&quot;:[{&quot;id&quot;:2200,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;en&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},{&quot;id&quot;:2201,&quot;subdivision_id&quot;:1099,&quot;locale&quot;:&quot;vi&quot;,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null}],&quot;status&quot;:null,&quot;name&quot;:&quot;Sau 17h ND1&quot;,&quot;address&quot;:null,&quot;locale&quot;:&quot;vi&quot;,&quot;specific_area&quot;:null,&quot;text_for_patient&quot;:null,&quot;description&quot;:null},&quot;subdivision_id&quot;:1099}">
                                                                                                <div data-agenda="ND1 Sân 5 (3)"
                                                                                                    class="simplecalendar-slot "
                                                                                                    style="border-left:4px solid #FFFFFF; background-color:#FFFFFF; color:#000000;">
                                                                                                    270.000 đ </div>
                                                                                            </a></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND2 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND2 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5 (2)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5
                                                                                                (2)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
                                                                                    </tr>
                                                                                    <tr data-agenda="ND3 Sân 5 (3)">
                                                                                        <td width="100px"
                                                                                            style="vertical-align: middle; text-align: center">
                                                                                            <strong>ND3 Sân 5
                                                                                                (3)</strong>
                                                                                        </td>
                                                                                        <td class="2025-01-13"></td>
                                                                                        <td class="2025-01-14"></td>
                                                                                        <td class="2025-01-15"></td>
                                                                                        <td class="2025-01-16"></td>
                                                                                        <td class="2025-01-17"></td>
                                                                                        <td class="2025-01-18"></td>
                                                                                        <td class="2025-01-19"></td>
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
                            href="https://manager.datsan247.com/vi/all-agenda/299/make-appointments?slot[122534]=2025-01-19">Đặt
                            lịch</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BookingContent from '@/components/BookingContent.vue'


export default {
  name: 'App',
  components: {
    BookingContent
  }
}
</script>