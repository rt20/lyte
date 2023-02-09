<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta property="og:title" content="{{Request::route('linkeableResponse.linkeable.name')}}">
    <meta property="og:description" content="{{Request::route('linkeableResponse.linkeable.description')}}">
    @if(Request::route('linkeableResponse.linkeable.image'))
        <meta property="og:image" content="{{Request::route('linkeableResponse.linkeable.image')}}">
    @endif

    <title>{{Request::route('linkeableResponse.linkeable.name')}}</title>

    @foreach(Request::route('linkeableResponse.linkeable.pixels') as $pixel)
        @include("pixels.$pixel->type", ['pixel' => $pixel])
    @endforeach

    @yield('head-end')

    <script>
        var timer = setTimeout(function () {
            window.location = '{!! Request::route('linkeableResponse.linkeable')->long_url !!}'
        }, 500);
    </script>
</head>
<body>
<noscript>
    Redirecting to <a href="{{Request::route('linkeableResponse.linkeable.long_url')}}">{{Request::route('linkeableResponse.linkeable.long_url')}}</a>
</noscript>

@yield('body-end')
</body>
</html>
