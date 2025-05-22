<?php
use Illuminate\Support\Facades\Schedule;

Schedule::command('send-stream')->daily()->at('18:55')->timezone('Australia/Sydney');