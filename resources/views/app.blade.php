@extends('common::framework')

@section('progressive-app-tags')
{{--	<link rel="manifest" href="client/manifest.json">--}}
	<meta name="theme-color" content="#1976d2">
@endsection

@section('angular-styles')
    {{--angular styles begin--}}
		<link rel="stylesheet" href="client/styles.c5e9b46f0acf8e2ea9b2.css" media="print" onload="this.media='all'">
	{{--angular styles end--}}
@endsection

@section('angular-scripts')
    {{--angular scripts begin--}}
		<script src="client/runtime-es2015.233628014257da1057a0.js" type="module"></script>
		<script src="client/runtime-es5.233628014257da1057a0.js" nomodule="" defer=""></script>
		<script src="client/polyfills-es5.dcc988456e44a59fd808.js" nomodule="" defer=""></script>
		<script src="client/polyfills-es2015.706b2530f9a3f6416e7a.js" type="module"></script>
		<script src="client/main-es2015.bd83dbe4cce5efbd737e.js" type="module"></script>
		<script src="client/main-es5.bd83dbe4cce5efbd737e.js" nomodule="" defer=""></script>
	{{--angular scripts end--}}
@endsection

@if($linkeable = Request::route('linkeableResponse.linkeable'))
	@foreach($linkeable->pixels as $pixel)
		@include("pixels.{$pixel->type}", ['pixel' => $pixel])
	@endforeach
@endif
