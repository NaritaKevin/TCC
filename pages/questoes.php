<?php
$conn = new mysqli("localhost", "root", "", "pedagogy");
 
if ($conn->connect_errno) {
    die("Conexão falhou: " . $conn->connect_error);
    
}
 
$sql = "SELECT q.queID, q.queDescricao, q.quePalavrasChave, q.queCodigoBncc, q.queNivel, q.queAnoID, q.queStsTipo,q.queStsRevisao,s.subDescricao  FROM questoes q JOIN subgrupos s ON q.queID = s.subID";
$result = $conn->query($sql);
$arr_questoes = [];
if ($result->num_rows > 0) {
    $arr_questoes = $result->fetch_all(MYSQLI_ASSOC);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Pedagogy</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="../vendors/feather/feather.css">
    <link rel="stylesheet" href="../vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" href="../vendors/css/vendor.bundle.base.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../vendors/bootstrapselect/bootstrap-select.min.css">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <link rel="stylesheet" href="../vendors/datatables.net-bs4/dataTables.bootstrap4.css">
    <link rel="stylesheet" href="../vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" type="text/css" href="../js/select.dataTables.min.css">
    <link rel="stylesheet" href="../js/jquery.datetimepicker.min.css">

    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="../css/vertical-layout-light/style.css">
    <!-- endinject -->
    <link rel="shortcut icon" href="../images/logo-mini.svg" />
</head>

<body>
    <div class="container-scroller">
        <!-- partial:../../partials/_navbar.html -->
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a id="" class="navbar-brand brand-logo mr-5" href="../index.html"><img src="../images/logo-full.svg"
                        class="mr-4 filter-purple" alt="logo" /></a>
                <a class="navbar-brand brand-logo-mini" href="../index.html"><img src="../images/logo-mini.svg"
                        alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="icon-menu"></span>
                </button>

                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item dropdown">
                        <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#"
                            data-toggle="dropdown">
                            <i class="icon-bell mx-0"></i>
                            <span class="count"></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                            aria-labelledby="notificationDropdown">
                            <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                            <a class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <div class="preview-icon bg-success">
                                        <i class="ti-info-alt mx-0"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content">
                                    <h6 class="preview-subject font-weight-normal">Application Error</h6>
                                    <p class="font-weight-light small-text mb-0 text-muted">
                                        Just now
                                    </p>
                                </div>
                            </a>
                            <a class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <div class="preview-icon bg-warning">
                                        <i class="ti-settings mx-0"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content">
                                    <h6 class="preview-subject font-weight-normal">Settings</h6>
                                    <p class="font-weight-light small-text mb-0 text-muted">
                                        Private message
                                    </p>
                                </div>
                            </a>
                            <a class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <div class="preview-icon bg-info">
                                        <i class="ti-user mx-0"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content">
                                    <h6 class="preview-subject font-weight-normal">New user registration</h6>
                                    <p class="font-weight-light small-text mb-0 text-muted">
                                        2 days ago
                                    </p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item nav-profile dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                            <span>Perfil</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown"
                            aria-labelledby="profileDropdown">
                            <a class="dropdown-item">
                                <i class="ti-settings text-primary"></i>
                                Settings
                            </a>
                            <a class="dropdown-item">
                                <i class="ti-power-off text-primary"></i>
                                Logout
                            </a>
                        </div>
                    </li>

                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                    data-toggle="offcanvas">
                    <span class="icon-menu"></span>
                </button>
            </div>
        </nav>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">

            <!-- partial:../../partials/_sidebar.html -->
            <?php require_once '../partials/menu.php';?>
            <!-- Corpo da página-->
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">

                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Tabela de Questões</h4>
                                        <p class="card-description">
                                            <button type="button" id="btn-nova-questao"
                                                class="btn btn-primary btn-icon-text">
                                                <i class="bi bi-plus-circle btn-icon-prepend"></i>
                                                Nova questão
                                            </button>
                                        </p>
                                        <div id="cadastrarQuestao" class=" stretch-card">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h4 class="card-title">Questão</h4>
                                                    <p class="card-description">
                                                        Cadastre a questão para a atividade.
                                                    </p>
                                                    <form>
                                                        <div class="form-group">
                                                            <label class="labelCadastroAtuacao">Disciplina</label>
                                                            <select class="selectpicker show-tick" data-width="fit"
                                                                data-live-search="true">
                                                                <option disabled selected>Disciplina</option>
                                                                <option>Matemática</option>
                                                                <option>Biologia</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="labelCadastroAtuacao">Temática</label>
                                                            <select class="selectpicker show-tick" data-width="fit"
                                                                data-live-search="true">
                                                                <option disabled selected>Temática</option>
                                                                <option>Operações Matematicas</option>
                                                                <option>Fisiologia Humana</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="labelCadastroAtuacao">Subgrupo</label>
                                                            <select class="selectpicker show-tick" data-width="fit"
                                                                data-live-search="true">
                                                                <option disabled selected>Subgrupo</option>
                                                                <option>Problemas</option>
                                                                <option>Sistema Circulatorio</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="labelCadastroAtuacao">Nível</label>
                                                            <select class="selectpicker show-tick" data-width="fit"
                                                                data-live-search="true" id="nivelquestao">
                                                                <option disabled selected>Nível</option>
                                                                <option>Fácil</option>
                                                                <option>Médio</option>
                                                                <option>Difícil</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="codigobncc">Código BNCC</label>
                                                            <input type="text" class="form-control" name="codigobncc"id="codigobncc"
                                                                placeholder="Código BNCC">
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="enunciado">Enunciado</label>
                                                            <textarea class="form-control" name="enunciado" id="enunciado"
                                                                rows="7"></textarea>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="palavrasChave">Palavras chave</label>
                                                            <input type="text" class="form-control" name="palavrasChave" id="palavrasChave"
                                                                placeholder="Palavras chave">
                                                        </div>
                                                        <div class="form-group">
                                                            <p class="card-title">
                                                                Alternativas.
                                                            </p>
                                                            <p class="card-description">
                                                                Cadastre as alternativas da questão.
                                                            </p>
                                                            <button id="adicionarQuestao" type="button"
                                                                class="btn btn-inverse-primary btn-rounded btn-icon">
                                                                <i class="bi bi-plus-lg"></i>
                                                            </button>
                                                            <button id="deletarQuestao" type="button"
                                                                class="btn btn-inverse-danger btn-rounded btn-icon">
                                                                <i class="bi-trash"></i>
                                                            </button>
                                                        </div>

                                                        <div class="form-group">
                                                            <ul id="alternativas" class="list-group">

                                                            </ul>
                                                        </div>

                                                        <button id="cadastrarQuestao" type="submit"
                                                            class="btn btn-primary mr-2">Cadastrar</button>
                                                        <button id="cancelarQuestao" type="button"
                                                            class="btn btn-secondary">Cancelar</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tableQuestoesToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover table-striped" style="width: 100%"id="tableQuestoes">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Enunciado</th>
                                                        <th>Palavras Chave</th>
                                                        <th>Subgrupo</th>
                                                        <th>Código BNCC</th>
                                                        <th>Nível</th>
                                                        <th>Ano</th>
                                                        <th>Status Tipo</th>
                                                        <th>Revisão</th>
                                                        <th>Ação</th>
                                                       

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>

                <div class="modal fade" id="modalInfoQuestao" tabindex="-1" aria-labelledby="modalInfoQuestao"
                    aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <p class="card-title">Informações Adicionais</p>
                                            <div class="table-responsive">
                                                <table class="table ">
                                                    <thead>
                                                        <tr>
                                                            <th>Disciplina</th>
                                                            <th>Temática</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Biologia</td>
                                                            <td>Divisão celular</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="modalCancelar" type="button" class="btn btn-secondary">Cancelar</button>
                                <button id="modalConfirmar" type="button" class="btn btn-primary">Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>


              
                <?php require_once '../partials/footer.php';?>
            </div>

        </div>

    </div>
    < <!-- plugins:js -->
        <script src="../vendors/js/vendor.bundle.base.js"></script>
        <!-- endinject -->

        <!-- inject:js -->
        <script src="../vendors/datatables.net/jquery.dataTables.js"></script>
        <script src="../vendors/datatables.net-bs4/dataTables.bootstrap4.js"></script>
        <script src="../js/dataTables.select.min.js"></script>
        <script src="../js/off-canvas.js"></script>
        <script src="../js/hoverable-collapse.js"></script>
        <script src="../js/template.js"></script>
        <script src="../vendors/bootstrapselect/bootstrap-select.min.js"></script>

        <script src="../js/settings.js"></script>

        <!-- endinject -->
        <!-- Custom js for this page-->
        <script src="../js/mainjs/questoes.js"></script>
        <!-- End custom js for this page-->
</body>

</html>