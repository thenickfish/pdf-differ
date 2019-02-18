FROM codenvy/cpp

WORKDIR /app
RUN sudo chown -R user /app && mkdir ./pdf-diff

RUN sudo apt-get update && sudo apt-get install git -y
RUN git clone https://github.com/vslavik/diff-pdf.git
RUN sudo apt-get install make automake g++ -y
RUN sudo apt-get install libpoppler-glib-dev poppler-utils libwxgtk3.0-dev -y
WORKDIR /app/diff-pdf
RUN ./bootstrap
RUN ./configure
RUN make
RUN sudo make install

VOLUME /app/pdf-diff
CMD ["diff-pdf", "--output-diff=/app/pdf-diff/diff.pdf", "/app/pdf-diff/a.pdf", "/app/pdf-diff/b.pdf"]