$(document).ready(function () {
    let buscaInicialQuestao = true;
    let buscaInicialAtividade = true;
    let buscaInicialQuestõesEditar = true;
    let buscaInicialNada = true ;

    var opAtividade
    var opId

    var opDelete
    var opidDelete
    var queSel = [];
    var dadosQuestao = [];
    let buscaInicialQuestoesSelecionadas = true;
    var queIDdelete
    var arrayDelete = []
    var questoesID
    var atualizar
    var IDatividade

    init();

    function init() {

        $("#cadastrarAtividade").hide();
        $("#cadastroQuestoes").hide();
        $("#escolherQuestoes").hide();
        $("#cadastrarQuestao").hide();
        $("#data-inicial,#data-final").datetimepicker({
            timepicker: false, mask: true, format: 'd/m/Y',
        })




        tableAtividade = $('#tableAtividade').DataTable({

            responsive: true,
            ajax: {
                "url": "../backend/BackAtividade/atividadeBack.php",
                "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                "data": { buscaInicialAtividade: buscaInicialAtividade }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                "dataSrc": ""
            },
            language: { // tradução em portgues da tabela
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
            columns: [
                //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o queID.
                { data: 'atiID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                { data: 'atiDescricao' },
                { data: 'atiObservacao' },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        let data_americana = data.atiDataInicio;
                        let data_brasileira = data_americana.split('-').reverse().join('/');

                        return data_brasileira;
                    }
                },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        let data_americana = data.atiDataFim;
                        let data_brasileira = data_americana.split('-').reverse().join('/');

                        return data_brasileira;
                    }
                },
                { data: 'tipDescricao' },

                {
                    data: null, render: function (data, type, row) {
                        if (data.atiStatus == "Pública") {
                            return `<label class="badge badge-success">${data.atiStatus}</label>`;

                        } else {
                            return `<label class="badge badge-danger">${data.atiStatus}</label>`;
                        }
                    }
                },
                { data: 'claNome'},
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        return `<button id="btn" type="button"
                        class="btn btn-inverse-primary btn-rounded btn-icon btn-info-questao ">
                        <i class="bi bi-info-lg"></i>
                    </button>
                    <button type="button"
                        class="btn btn-inverse-success btn-rounded btn-icon btn-editar-atividade">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button"
                        class="btn btn-inverse-danger btn-rounded btn-icon  btn-excluir-atividade">
                        <i class="bi bi-trash"></i>
                    </button>`;
                    }
                },
            ]


        })

        //? Tabela de escolher questões DO MODAL
        tableEscolher = $('#tableEscolherQuestoes').DataTable({

            "select": {
                "style": 'multi'
            },
            "columnDefs": [
                {
                    //"orderable": true,
                    //"targets": [9]
                },
                {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    }
                }
            ],
            responsive: true,
            ajax: {
                "url": "../backend/BackAtividade/atividadeBack.php",
                "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                "data": { buscaInicialQuestao: buscaInicialQuestao }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                "dataSrc": ""
            },
            language: { // tradução em portgues da tabela
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
            columns: [
                //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o queID.
                { data: 'queID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                { 
                    data: null, render: function (data, type, row) {
                        let descricao = data.queDescricao.slice(0, 200);
                        let tamanho = descricao.length;
                        if (tamanho >= 200) {
                            descricao = descricao + "..."
                        }

                        return `<span style=" max-width: 1200px;
                        min-width: 1200px;
                        display: block;
                        overflow-wrap: break-word;
                        white-space: break-spaces;">${descricao}</span>`;

                    }
                },
                { data: 'queCodigoBncc' },
                { data: 'queStsTipo' },
               // {
               //     data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

               //         return `<button  type="button"
               //             class="btn  btn-inverse-success btn-rounded btn-icon btn-edit-disciplina">
               //             <i class="bi bi-pencil"></i>
               //         </button>
               //         <button type="button"
               //             class="btn btn-inverse-danger btn-rounded btn-icon btn-del-disciplina">
                //            <i class="bi bi-trash"></i>
               //         </button>`;
               //     }
               // },
            ]


        })

    }

    // $("#cancelarAtividade").click(function (e) {
    //     if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
    //   let teste = tableEscolhidas.columns(0).data().eq(0).sort()

    //       console.log(teste)
    //   }


    // })
    //? BOTAO DE CONFIMAR ESCOLHA QUESTÕES

    $('#btn-modalConfirmarQuestao').click(function (e) {
        buscaInicialQuestoesSelecionadas = true;
        var rowsel = tableEscolher.column(0).checkboxes.selected();

        if (rowsel.length > 0) {
            queSel = rowsel.join(",");


            $("#visualizar-ids").text(rowsel.join(","))

            $('#modalQuestao').modal('hide');
            e.preventDefault();


            if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
                $('#tableQuestoesAtividade').DataTable().destroy();
                console.log("entrou")
            }


            //? TABELA DE QUESÕES JA ESCOLHIDAS
            tableEscolhidas = $('#tableQuestoesAtividade').DataTable({
                destroy: true,
                responsive: true,

                ajax: {
                    "url": "../backend/BackAtividade/atividadeBack.php",
                    "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                    "data": { queSel: queSel, buscaInicialQuestoesSelecionadas: buscaInicialQuestoesSelecionadas }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                    "dataSrc": ""
                },
                language: { // tradução em portgues da tabela
                    url: "../partials/dataTablept-br.json"
                },
                lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
                columns: [
                    //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                    //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                    // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o queID.
                    { data: 'queID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                    //{ data: 'queDescricao' },//enunciado da questão
                    {
                        data: null, render: function (data, type, row) {
                            let descricao = data.queDescricao.slice(0, 200);
                            let tamanho = descricao.length;
                            if (tamanho >= 200) {
                                descricao = descricao + "..."
                            }
    
                            return `<span style=" max-width: 500px;
                            min-width: 200px;
                            display: block;
                            overflow-wrap: break-word;
                            white-space: break-spaces;">${descricao}</span>`;
    
                        }
                     },
                    { data: 'quePalavrasChave' },
                    { data: 'subDescricao' },
                    { data: 'queCodigoBncc' },
                    { data: 'nivDescricao' },
                    {
                        data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                            return `
                        <button type="button"
                            class="btn btn-inverse-danger btn-rounded btn-icon btn-del-questaoEscolhida">
                            <i class="bi bi-trash"></i>
                        </button>`;
                        }
                    },
                ]


            })
        } else {
            tableEscolhidas.clear().draw();
        }
        $('#modalQuestao').modal('hide');
        e.preventDefault();


    })


    //? Formulario de Cadastro de Atividade
    $('#formAtividades').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina
        var nome = $('#nome').val();
        var descricao = $('#descricao').val();
        var tipoopc = $('#tipoopc option:selected').val();
        var dataInicial = $("#data-inicial").val();
        var dataFinal = $("#data-final").val();
        var status = $("#status option:selected").val();
        var classe = $("#classe").val();
        var StsQuestoes = $("#StsQuestoes option:selected").val();
        var dataFormInicial
        var dataFormFinal
        var questoesID = []
        var opcao = atualizar;
        IDatividade = opId;

       console.log(StsQuestoes);
        function formatarData(data) {
            var dia = data.split("/")[0];
            var mes = data.split("/")[1];
            var ano = data.split("/")[2];


            return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
            // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
        }
        

        if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
            questoesID = tableEscolhidas.columns(0).data().eq(0).sort()


        }


        if (questoesID.length == 0) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Por favor, selecione as Questões",
                showConfirmButton: false,
                timer: 2000
            })

        } else {


            dataFormInicial = formatarData(dataInicial);
            dataFormFinal = formatarData(dataFinal);


          //  console.log(nome);
          //  console.log(descricao);
          //  console.log(tipoopc);
          //  console.log(dataFormInicial);
          //  console.log(dataFormFinal);
           // console.log(status);
          //  console.log("questoes")
           // console.log(questoesID)

            let arrayID = [];

            for (var i = 0; i < questoesID.length; i++) {
                arrayID.push(questoesID[i]);
            }
            arrayID = arrayID.sort((a, b) => a - b);//* Ordenar numeros crescente
            // console.log("Lista de ID:", arrayID)
            $.ajax({
                url: '../backend/BackAtividade/atividadeBack.php',
                method: 'POST',
                data: {
                    nome: nome,
                    descricao: descricao,
                    tipoopc: tipoopc,
                    dataFormInicial: dataFormInicial,
                    dataFormFinal: dataFormFinal,
                    status: status,
                    questoesID: arrayID,
                    opAtividade:opcao,
                    IDatividade: IDatividade,
                    turma: classe,
                    StsQuestoes: StsQuestoes

                },
                dataType: 'json',
                success: function (data) {


                    if (data.type == 'erro') {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: data.text,
                            showConfirmButton: false,
                            timer: 2000
                        })

                    } else if (data.type == 'sucesso') {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: data.text,
                            showConfirmButton: false,
                            timer: 2000
                        })

                        $("#btn-nova-atividade").click();//Simula um click manual no botao de cadastrar
                    } else if (data.type == 'validacao') {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: data.text,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                }, error: function (data) {
                    alert("erro")
                }
            }).done(function (data) {
                tableAtividade.ajax.reload(null, false);
                atualizar = "";
            });

        }



    });



    //?Botao da tabela de editar atividade
    $("#tbodyAtivdades").on("click", ".btn-editar-atividade", function () {
        toggleNovaAtividade()//Mostra ou esconde tabela
        //children: 
        let dados = $(this).closest('tr').children("td").map(function () { // função .map é utilizado para pegar todos os dados contidos na linha onde o botão editar foi pressionado, como ID, DESCRICAO E ETC.
            return $(this).text();
        }).get();
        opId = dados[0];
        //? $("#disID").val(dados[0]);//Insere ID no formulario para alterar
        opAtividade = "update";
        atualizar = "update2";
        $("#descricao").val(dados[2]);
        $("#data-inicial").val(dados[3]);
        $("#data-final").val(dados[4]);
         $("#status").val(dados[6])


        console.log(opId);

        
         //? TABELA DE QUESÕES JA ESCOLHIDAS
         tableEscolhidas = $('#tableQuestoesAtividade').DataTable({
            destroy: true,
            responsive: true,

            ajax: {
                "url": "../backend/BackAtividade/atividadeBack.php",
                "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                "data": {opID: opId, buscaInicialQuestõesEditar: buscaInicialQuestõesEditar}, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                "dataSrc": ""
            },
            language: { // tradução em portgues da tabela
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
            columns: [
                //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o queID.
                { data: 'queID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                //{ data: 'queDescricao' },//enunciado da questão
                {
                    data: null, render: function (data, type, row) {
                        let descricao = data.queDescricao.slice(0, 200);
                        let tamanho = descricao.length;
                        if (tamanho >= 200) {
                            descricao = descricao + "..."
                        }

                        return `<span style=" max-width: 500px;
                        min-width: 200px;
                        display: block;
                        overflow-wrap: break-word;
                        white-space: break-spaces;">${descricao}</span>`;

                    }
                 },
                { data: 'quePalavrasChave' },
                { data: 'queCodigoBncc' },
                { data: 'queStsTipo' },
                { data: 'queNivelID' },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        return `
                    <button type="button"
                        class="btn btn-inverse-danger btn-rounded btn-icon btn-del-questaoEscolhida">
                        <i class="bi bi-trash"></i>
                    </button>`;
                    }
                },
            ]


        })


        if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
            questoesID = tableEscolhidas.columns(0).data().eq(0).sort()

        }
        
        let arrayID = [];

        for (var i = 0; i < questoesID.length; i++) {
            arrayID.push(questoesID[i]);
        }

        $.ajax({
            url: '../backend/BackAtividade/atividadeBack.php',
            method: 'POST',
            data: {
                opID: opId,
                opAtividade: opAtividade,
                
            },
            dataType: 'json',
            success: function (data) {

                if (data.type == 'erro') {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })

                } else {

                    $("#nome").val(data.atiDescricao);
                    $("#tipoopc").val(data.atiTipoID);
                    if (data.atiStatus == "Pública") {
                        $("#status").val(2);
                        $("#status").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Pública");
                    } else {
                        $("#status").val(1);
                        $("#status").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Privada");
                    }
                    $("#tipoopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(dados[5]);
                    $("#classe").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(dados[7]);
                    //? $("#btn-nova-atividade").click();//Simula um click manual no botao de cadastrar
                }
            }
        })
    });


    function toggleNovaAtividade() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;
        if ($('#cadastrarAtividade').css('display') == 'none') {
            $("#btn-nova-atividade").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableAtividadesToggle").toggle("slow");
        } else {
            $("#btn-nova-atividade").text('Nova atividade').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableAtividadesToggle").toggle("slow");
        }
        $("#cadastrarAtividade").toggle("slow");
    }

    //! Esconder/mostrar cadastrar atividade
    $("#btn-nova-atividade").click(function () {
        toggleNovaAtividade()
        $('#nome, #data-final, #data-inicial, #descricao').val("");

        $("#tipoopc").val(1);
        $("#status").val(1);
        $("#classe").val(1);
        
        if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {

            $('#tableQuestoesAtividade').DataTable().destroy();
            console.log("entrou");
            tableEscolhidas = $('#tableQuestoesAtividade').DataTable({
                destroy: true,
                responsive: true,

                ajax: {
                    "url": "../backend/BackAtividade/atividadeBack.php",
                    "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                    "data": {buscaInicialNada: buscaInicialNada }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                    "dataSrc": ""
                },
                language: { // tradução em portgues da tabela
                    url: "../partials/dataTablept-br.json"
                },
                lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
                columns: [
                    //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                    //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                    // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o queID.
                    { data: 'queID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                    //{ data: 'queDescricao' },//enunciado da questão
                    {
                        data: null, render: function (data, type, row) {
                            let descricao = data.queDescricao.slice(0, 200);
                            let tamanho = descricao.length;
                            if (tamanho >= 200) {
                                descricao = descricao + "..."
                            }
    
                            return `<span style=" max-width: 500px;
                            min-width: 200px;
                            display: block;
                            overflow-wrap: break-word;
                            white-space: break-spaces;">${descricao}</span>`;
    
                        }
                     },
                    { data: 'quePalavrasChave' },
                    { data: 'subDescricao' },
                    { data: 'queCodigoBncc' },
                    { data: 'nivDescricao' },
                    {
                        data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                            return `
                        <button type="button"
                            class="btn btn-inverse-danger btn-rounded btn-icon btn-del-questaoEscolhida">
                            <i class="bi bi-trash"></i>
                        </button>`;
                        }
                    },
                ]


            })
            
        }



        
    });
    $("#cancelarAtividade").click(function () {
        toggleNovaAtividade()
    })
    //!
    //!  Modal esconder/mostrar
    $("#btn-modal-escolher").on("click", function () {
        $('#modalQuestao').modal('show');
        buscaInicialQuestoesSelecionadas = false;
        //tableEscolher.ajax.reload(null, false);
    });



    //! BOTAO DE ADICIONAR QUESTAO DIRETO EM ATIVIDADES
    $("#adicionarQuestoes").click(function () {
        $("#tableQuestoesSelecionadas").toggle("slow");
        $("#cadastrarQuestao").toggle("slow");
        $("#botoesAtividade").hide();
    })

    //! BOTAO CANCELAR CADASTRO DE QUESTÃO EM ATIVIDADES

    $("#cancelarQuestao").click(function () {
        $("#tableQuestoesSelecionadas").toggle("slow");
        $("#botoesAtividade").toggle("slow");
        $("#tableQuestoesToggle").toggle();
    })

    //! Modal Excluir Atividade
    $("#tbodyAtivdades").on("click", ".btn-excluir-atividade", function () {
        // console.log("apertou");
        $('#modalDelete').modal('show');

        let dadosAtividade = $(this).closest('tr').children("td").map(function () { // função .map é utilizado para pegar todos os dados contidos na linha onde o botão editar foi pressionado, como ID, DESCRICAO E ETC.
            return $(this).text();
        }).get();


       // if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
       //     queIDdelete = tableEscolhidas.columns(0).data().eq(0).sort()


      //  }


       // for (var i = 0; i < queIDdelete.length; i++) {
      //      arrayDelete.push(queIDdelete[i]);
       // }
      //  arrayDelete = arrayDelete.sort((a, b) => a - b);//* Ordenar numeros crescente

        opDelete = "delete"
        opidDelete = dadosAtividade[0];
        //console.log(opAtividade);
        // console.log(opId);


    });


    $('#formDelete').submit(function (e) {
        e.preventDefault();
        console.log(opDelete);
        console.log(opidDelete);
        $.ajax({
            url: '../backend/BackAtividade/atividadeBack.php',
            method: 'POST',
            data: {
                opID: opidDelete,
                opAtividade: opDelete,
                //queIDdelete: arrayDelete
            },
            dataType: 'json',
            success: function (data) {


                if (data.type == 'erro') {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })

                } else if (data.type == 'sucesso') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })

                    //  $("#btn-nova-atividade").click();//Simula um click manual no botao de cadastrar
                } else if (data.type == 'validacao') {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }, error: function (data) {
                alert("erro")
            }
        }).done(function (data) {

            $("#modalDelete").modal('hide');
            tableAtividade.ajax.reload(null, false);

        })
    })

    //! modal Cancelar Exclusão Atividade
    $("#modalCancelarAtividade").click(function () {
        $('#modalDelete').modal('hide')
    })

    $("#btn-modalCancelarQuestao").click(function () {
        $('#modalQuestao').modal('hide')
    });
    //! Modal informação
    $(".btn-info-questao").on("click", function () {
        $('#modalInfoAtividade').modal('show')
    });
    $("#modalCancelar").click(function () {
        $('#modalDelete').modal('hide')
    })


    //!
    function jqueryuiinit() {

        var fixHelperModified = function (e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function (index) {
                $(this).width($originals.eq(index).width())
            });
            return $helper;
        },
            updateIndex = function (e, ui) {
                $('td.index', ui.item.parent()).each(function (i) {
                    $(this).html(i + 1);
                });
                $('input[type=text]', ui.item.parent()).each(function (i) {
                    $(this).val(i + 1);
                });
            };

        $("#tableQuestoesAtividade #tbodyQuestoesAtividade").sortable({
            helper: fixHelperModified,
            stop: updateIndex
        }).disableSelection();

        $("#tbodyQuestoesAtividade").sortable({
            distance: 5,
            delay: 100,
            opacity: 0.6,
            cursor: 'move',
            update: function () { }
        });

    }



});