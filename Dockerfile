FROM continuumio/miniconda3
WORKDIR /app
COPY environment.yml .
RUN conda env update --file environment.yml --prune --name base
EXPOSE 80

# fix projsee https://github.com/conda-forge/geopandas-feedstock/issues/63
ENV PROJ_LIB=/opt/conda/share/proj

CMD xcube serve /data/data.zarr -p 80