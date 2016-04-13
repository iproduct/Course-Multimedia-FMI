<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
    <head>
        <title>IPT Polling Demo MVC 1.0 | Home</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="../css/custom.css">
        <style>
        </style>
    </head>
    <body>
        <!-- Enable HTML 5 elements in IE 7+8 -->
        <!--[if lt IE 9]>
           <script src="js/html5shiv.min.js"></script>
        <![endif]-->
        <div class="container">

            <!-- Horizontal navigation -->
            <div class="navbar-header">

                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <img alt="IPT Polling Demo MVC 1.0" src="../img/ipt_duke_sm.png">
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="navbar-collapse bs-navbar-collapse collapse in" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home<span class="sr-only">(current)</span></a></li>
                    <!--<li><a href="#">Link</a></li>-->
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Polls <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="polls/browse">Browse All Polls</a></li>
                            <li><a href="polls/velocity">Browse All Polls [Velocity]</a></li>
                            <li class="divider"></li>
                            <li><a href="polls/add">Add New Poll</a></li>
                            <li><a href="polls/manage">Manage Polls</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="navbar-form navbar-left" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </li>
                </ul>               
            </div><!-- /.navbar-collapse -->

            <div class="jumbotron">
                <h1>IPT Polling Demo MVC 1.0</h1>
                <div class="row">
                    <div class="col-lg-8 col-md-8 hidden-sm hidden-xs ">
                        <p>IPT Polling Application demonstrates new JavaEE 8 <a href="https://www.jcp.org/en/jsr/detail?id=371">JSR 371: Model-View-Controller (MVC 1.0) Specification</a>
                            and it's reference implementation - project Ozark 
                            (<a href="https://ozark.java.net/">https://ozark.java.net/</a>).
                            MVC 1.0 is an action-oriented framework building on experience with previous frameworks 
                            such as <i>Struts, Struts, Spring MVC, VRaptor</i> etc. It is based on <i>JAX-RS, CDI</i> and <i>BV JavaEE technologies</i> and provides 
                            a standard, view specification neutral way to build web applications. 
                            Among supported view template frameworks are:
                            <i>JSP, Facelets, Freemarker, Handlebars, Jade, Mustache, Velocity,  Thymeleaf</i>, etc. </p>
                        <p class="disclaimer">NOTE: MVC 1.0 API Specification is in early draft stage, and is subject to change based on open community process.
                        </p>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-sm-push-0 hidden-xs">
                        <a href="#" title="MVC 1.0 diagram">
                            <img class="thumbnail thumbnail-popup img-responsive translucent" alt="MVC 1.0 diagram" src="../img/mvc_1_0.png">
                        </a>
                    </div>
                </div><!-- end row -->
                <a href="polls/add" class="btn btn-primary btn-lg">
                    Create Your Poll ...
                </a>
            </div> <!-- end jumbotron -->

            <!--Modal image zooming -->
            <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-popup">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">×</button>
                            <h3 class="modal-title">MVC 1.0 diagram</h3>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent polls -->
            <div class="row">
                <h2 class="col-lg-12">Recent Polls</h2>
                <c:forEach items="${polls}" var="p" varStatus="status">
                    <%-- Poll summary panel --%>
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title"><c:out value="${p.title}"/></h3>
                            </div>
                            <div class="panel-body">
                                <div class="panel-question"><c:out value="${p.question}"/></div> 
                                <a href="polls/${p.id}" class="thumbnail img-rounded">         
                                    <canvas id="canvas${status.count}" class="chart-area" width="150" height="150"
                                            data-chart='[<c:forEach items="${p.alternatives}" var="alt" varStatus="altStatus"><c:if test="${not altStatus.first}">,</c:if>{"label":"${alt.text}","value":${fn:length(alt.votes)}}</c:forEach>]' >
                                    </canvas>
                                    <div class="poll-legend pull-right">
                                        <%-- legend goes here --%>
                                    </div> 
                                </a>
                                    </div>
                                </div>
                            </div>
                </c:forEach>
            </div> <!-- DIV class="row" -->

            <div class="row">
                <nav class="col-xs-12">
                    <ul class="pagination pagination-lg center-block col-md-7 pull-right">
                        <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                        <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
                    </ul>
                </nav>
            </div>  <!-- DIV class="row" -->

            <footer class="row">
                <div class="col-xs-12 col-md-8">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.74966193396!2d23.36926430984111!3d42.6878448938619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85f2f0eebb1f%3A0xb337ee6918350c9c!2sIPT+-+Intellectual+Products+%26+Technologies!5e0!3m2!1sbg!2sbg!4v1447889935746" width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
                <div class="col-xs-12 col-md-4">
                    <h2>Contacts</h2>
                    <address>
                        <strong>IPT – Intellectual Products & Technologies Ltd.</strong><br>
                        Address: bl. 44 – office 2, Slatinska Str., Slatina<br>
                        Sofia, Bulgaria<br>
                        Tel.: (+359 2) 973 38 38<br>
                        E-mail: <a href="mailto:office@iproduct.org">office@iproduct.org</a><br>
                        Latitude: 42.68836, Longitude: 23.37077
                    </address>
                </div>
            </footer>
        </div> <!-- .container -->
        <!-- jQuery library -->
        <script src="../js/jquery-1.11.3.min.js"></script>

        <!-- Latest compiled JavaScript -->
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/Chart.min.js"></script>
        <script src="../js/home.js" type="text/javascript"></script>
    </body>
</html>

